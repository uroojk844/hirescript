<template>
    <div class="relative">
        <div class="flex gap-2 items-center">
            <label class="grid place-items-center cursor-pointer" :for="inputId">
                <Icon icon="material-symbols:location-on-outline" size="20" class="text-primary" />
            </label>
            <input :id="inputId" ref="inputRef" v-model="inputValue" type="text" :placeholder="placeholder"
                class="outline-none w-full" autocomplete="off" @input="handleInput" @focus="handleFocus"
                @blur="handleBlur" @keydown="handleKeydown" />
            <button v-if="inputValue" type="button" @click="clearInput"
                class="text-gray-400 hover:text-gray-600 transition-colors">
                <Icon icon="material-symbols:close" size="16" />
            </button>
        </div>

        <div v-if="isOpen && filteredCities.length > 0"
            class="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            @mousedown.prevent>
            <ul class="py-1">
                <li v-for="(city, index) in filteredCities" :key="`${city.name}-${city.state}`" :class="[
                    'px-3 py-2 cursor-pointer flex items-center space-x-2 transition-colors',
                    index === selectedIndex
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-900 hover:bg-gray-50'
                ]" @click="selectCity(city)" @mouseenter="selectedIndex = index">
                    <Icon icon="material-symbols:location-on-outline" size="16" class="text-gray-400" />
                    <div class="flex-1">
                        <div class="font-medium text-sm">{{ city.name }}</div>
                        <div class="text-xs text-gray-500">{{ city.state }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface City {
    name: string
    state: string
}

interface Props {
    modelValue?: string
    placeholder?: string
    inputId?: string
}

interface Emits {
    (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: 'Search cities in India...',
    inputId: 'city-autocomplete'
})

const emit = defineEmits<Emits>()

// Comprehensive list of major Indian cities
const indianCities: City[] = [
    // Andhra Pradesh
    { name: "Visakhapatnam", state: "Andhra Pradesh" },
    { name: "Vijayawada", state: "Andhra Pradesh" },
    { name: "Guntur", state: "Andhra Pradesh" },
    { name: "Nellore", state: "Andhra Pradesh" },
    { name: "Kurnool", state: "Andhra Pradesh" },
    { name: "Rajahmundry", state: "Andhra Pradesh" },
    { name: "Tirupati", state: "Andhra Pradesh" },

    // Arunachal Pradesh
    { name: "Itanagar", state: "Arunachal Pradesh" },
    { name: "Naharlagun", state: "Arunachal Pradesh" },

    // Assam
    { name: "Guwahati", state: "Assam" },
    { name: "Silchar", state: "Assam" },
    { name: "Dibrugarh", state: "Assam" },
    { name: "Jorhat", state: "Assam" },
    { name: "Nagaon", state: "Assam" },
    { name: "Tinsukia", state: "Assam" },

    // Bihar
    { name: "Patna", state: "Bihar" },
    { name: "Gaya", state: "Bihar" },
    { name: "Bhagalpur", state: "Bihar" },
    { name: "Muzaffarpur", state: "Bihar" },
    { name: "Purnia", state: "Bihar" },
    { name: "Darbhanga", state: "Bihar" },
    { name: "Bihar Sharif", state: "Bihar" },

    // Chhattisgarh
    { name: "Raipur", state: "Chhattisgarh" },
    { name: "Bhilai", state: "Chhattisgarh" },
    { name: "Korba", state: "Chhattisgarh" },
    { name: "Bilaspur", state: "Chhattisgarh" },
    { name: "Durg", state: "Chhattisgarh" },

    // Goa
    { name: "Panaji", state: "Goa" },
    { name: "Vasco da Gama", state: "Goa" },
    { name: "Margao", state: "Goa" },

    // Gujarat
    { name: "Ahmedabad", state: "Gujarat" },
    { name: "Surat", state: "Gujarat" },
    { name: "Vadodara", state: "Gujarat" },
    { name: "Rajkot", state: "Gujarat" },
    { name: "Bhavnagar", state: "Gujarat" },
    { name: "Jamnagar", state: "Gujarat" },
    { name: "Junagadh", state: "Gujarat" },
    { name: "Gandhinagar", state: "Gujarat" },
    { name: "Anand", state: "Gujarat" },

    // Haryana
    { name: "Gurgaon", state: "Haryana" },
    { name: "Faridabad", state: "Haryana" },
    { name: "Panipat", state: "Haryana" },
    { name: "Ambala", state: "Haryana" },
    { name: "Yamunanagar", state: "Haryana" },
    { name: "Rohtak", state: "Haryana" },
    { name: "Hisar", state: "Haryana" },
    { name: "Karnal", state: "Haryana" },

    // Himachal Pradesh
    { name: "Shimla", state: "Himachal Pradesh" },
    { name: "Dharamshala", state: "Himachal Pradesh" },
    { name: "Solan", state: "Himachal Pradesh" },
    { name: "Mandi", state: "Himachal Pradesh" },
    { name: "Kullu", state: "Himachal Pradesh" },

    // Jharkhand
    { name: "Ranchi", state: "Jharkhand" },
    { name: "Jamshedpur", state: "Jharkhand" },
    { name: "Dhanbad", state: "Jharkhand" },
    { name: "Bokaro", state: "Jharkhand" },
    { name: "Deoghar", state: "Jharkhand" },

    // Karnataka
    { name: "Bangalore", state: "Karnataka" },
    { name: "Bengaluru", state: "Karnataka" },
    { name: "Mysore", state: "Karnataka" },
    { name: "Hubli", state: "Karnataka" },
    { name: "Mangalore", state: "Karnataka" },
    { name: "Belgaum", state: "Karnataka" },
    { name: "Gulbarga", state: "Karnataka" },
    { name: "Davangere", state: "Karnataka" },
    { name: "Ballari", state: "Karnataka" },
    { name: "Bijapur", state: "Karnataka" },

    // Kerala
    { name: "Kochi", state: "Kerala" },
    { name: "Thiruvananthapuram", state: "Kerala" },
    { name: "Kozhikode", state: "Kerala" },
    { name: "Thrissur", state: "Kerala" },
    { name: "Kollam", state: "Kerala" },
    { name: "Kannur", state: "Kerala" },
    { name: "Kottayam", state: "Kerala" },
    { name: "Palakkad", state: "Kerala" },

    // Madhya Pradesh
    { name: "Bhopal", state: "Madhya Pradesh" },
    { name: "Indore", state: "Madhya Pradesh" },
    { name: "Gwalior", state: "Madhya Pradesh" },
    { name: "Jabalpur", state: "Madhya Pradesh" },
    { name: "Ujjain", state: "Madhya Pradesh" },
    { name: "Sagar", state: "Madhya Pradesh" },
    { name: "Dewas", state: "Madhya Pradesh" },
    { name: "Satna", state: "Madhya Pradesh" },

    // Maharashtra
    { name: "Mumbai", state: "Maharashtra" },
    { name: "Pune", state: "Maharashtra" },
    { name: "Nagpur", state: "Maharashtra" },
    { name: "Thane", state: "Maharashtra" },
    { name: "Nashik", state: "Maharashtra" },
    { name: "Aurangabad", state: "Maharashtra" },
    { name: "Solapur", state: "Maharashtra" },
    { name: "Amravati", state: "Maharashtra" },
    { name: "Kolhapur", state: "Maharashtra" },
    { name: "Sangli", state: "Maharashtra" },
    { name: "Malegaon", state: "Maharashtra" },
    { name: "Akola", state: "Maharashtra" },

    // Manipur
    { name: "Imphal", state: "Manipur" },
    { name: "Thoubal", state: "Manipur" },

    // Meghalaya
    { name: "Shillong", state: "Meghalaya" },
    { name: "Tura", state: "Meghalaya" },

    // Mizoram
    { name: "Aizawl", state: "Mizoram" },
    { name: "Lunglei", state: "Mizoram" },

    // Nagaland
    { name: "Kohima", state: "Nagaland" },
    { name: "Dimapur", state: "Nagaland" },

    // Odisha
    { name: "Bhubaneswar", state: "Odisha" },
    { name: "Cuttack", state: "Odisha" },
    { name: "Rourkela", state: "Odisha" },
    { name: "Berhampur", state: "Odisha" },
    { name: "Sambalpur", state: "Odisha" },

    // Punjab
    { name: "Ludhiana", state: "Punjab" },
    { name: "Amritsar", state: "Punjab" },
    { name: "Jalandhar", state: "Punjab" },
    { name: "Patiala", state: "Punjab" },
    { name: "Bathinda", state: "Punjab" },
    { name: "Mohali", state: "Punjab" },
    { name: "Firozpur", state: "Punjab" },

    // Rajasthan
    { name: "Jaipur", state: "Rajasthan" },
    { name: "Jodhpur", state: "Rajasthan" },
    { name: "Kota", state: "Rajasthan" },
    { name: "Bikaner", state: "Rajasthan" },
    { name: "Udaipur", state: "Rajasthan" },
    { name: "Ajmer", state: "Rajasthan" },
    { name: "Bhilwara", state: "Rajasthan" },
    { name: "Alwar", state: "Rajasthan" },

    // Sikkim
    { name: "Gangtok", state: "Sikkim" },
    { name: "Namchi", state: "Sikkim" },

    // Tamil Nadu
    { name: "Chennai", state: "Tamil Nadu" },
    { name: "Coimbatore", state: "Tamil Nadu" },
    { name: "Madurai", state: "Tamil Nadu" },
    { name: "Tiruchirappalli", state: "Tamil Nadu" },
    { name: "Salem", state: "Tamil Nadu" },
    { name: "Tirunelveli", state: "Tamil Nadu" },
    { name: "Erode", state: "Tamil Nadu" },
    { name: "Vellore", state: "Tamil Nadu" },
    { name: "Thoothukudi", state: "Tamil Nadu" },

    // Telangana
    { name: "Hyderabad", state: "Telangana" },
    { name: "Warangal", state: "Telangana" },
    { name: "Nizamabad", state: "Telangana" },
    { name: "Khammam", state: "Telangana" },
    { name: "Karimnagar", state: "Telangana" },

    // Tripura
    { name: "Agartala", state: "Tripura" },
    { name: "Dharmanagar", state: "Tripura" },

    // Uttar Pradesh
    { name: "Lucknow", state: "Uttar Pradesh" },
    { name: "Kanpur", state: "Uttar Pradesh" },
    { name: "Ghaziabad", state: "Uttar Pradesh" },
    { name: "Agra", state: "Uttar Pradesh" },
    { name: "Varanasi", state: "Uttar Pradesh" },
    { name: "Meerut", state: "Uttar Pradesh" },
    { name: "Prayagraj", state: "Uttar Pradesh" },
    { name: "Bareilly", state: "Uttar Pradesh" },
    { name: "Aligarh", state: "Uttar Pradesh" },
    { name: "Moradabad", state: "Uttar Pradesh" },
    { name: "Saharanpur", state: "Uttar Pradesh" },
    { name: "Gorakhpur", state: "Uttar Pradesh" },
    { name: "Noida", state: "Uttar Pradesh" },

    // Uttarakhand
    { name: "Dehradun", state: "Uttarakhand" },
    { name: "Haridwar", state: "Uttarakhand" },
    { name: "Roorkee", state: "Uttarakhand" },
    { name: "Haldwani", state: "Uttarakhand" },
    { name: "Rudrapur", state: "Uttarakhand" },

    // West Bengal
    { name: "Kolkata", state: "West Bengal" },
    { name: "Howrah", state: "West Bengal" },
    { name: "Durgapur", state: "West Bengal" },
    { name: "Asansol", state: "West Bengal" },
    { name: "Siliguri", state: "West Bengal" },
    { name: "Malda", state: "West Bengal" },
    { name: "Kharagpur", state: "West Bengal" },

    // Union Territories
    { name: "New Delhi", state: "Delhi" },
    { name: "Delhi", state: "Delhi" },
    { name: "Chandigarh", state: "Chandigarh" },
    { name: "Puducherry", state: "Puducherry" },
    { name: "Port Blair", state: "Andaman and Nicobar Islands" },
    { name: "Kavaratti", state: "Lakshadweep" },
    { name: "Daman", state: "Dadra and Nagar Haveli and Daman and Diu" },
    { name: "Silvassa", state: "Dadra and Nagar Haveli and Daman and Diu" },
    { name: "Leh", state: "Ladakh" },
    { name: "Kargil", state: "Ladakh" },
    { name: "Srinagar", state: "Jammu and Kashmir" },
    { name: "Jammu", state: "Jammu and Kashmir" }
]

// Reactive refs
const inputValue = ref(props.modelValue)
const inputRef = ref<HTMLInputElement>()
const isOpen = ref(false)
const selectedIndex = ref(-1)

// Computed properties
const filteredCities = computed(() => {
    if (!inputValue.value || inputValue.value.length < 1) {
        return []
    }

    const searchTerm = inputValue.value.toLowerCase()
    return indianCities
        .filter(city =>
            city.name.toLowerCase().includes(searchTerm) ||
            city.state.toLowerCase().includes(searchTerm)
        )
        .slice(0, 10) // Limit to 10 results
})

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue
})

// Watch for input changes
watch(inputValue, (newValue) => {
    emit('update:modelValue', newValue)
})

// Methods
const handleInput = () => {
    selectedIndex.value = -1
    isOpen.value = filteredCities.value.length > 0
}

const handleFocus = () => {
    if (inputValue.value && filteredCities.value.length > 0) {
        isOpen.value = true
    }
}

const handleBlur = () => {
    // Delay closing to allow for clicks on dropdown items
    setTimeout(() => {
        isOpen.value = false
        selectedIndex.value = -1
    }, 150)
}

const handleKeydown = (event: KeyboardEvent) => {
    if (!isOpen.value || filteredCities.value.length === 0) return

    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault()
            selectedIndex.value = selectedIndex.value < filteredCities.value.length - 1
                ? selectedIndex.value + 1
                : 0
            break
        case 'ArrowUp':
            event.preventDefault()
            selectedIndex.value = selectedIndex.value > 0
                ? selectedIndex.value - 1
                : filteredCities.value.length - 1
            break
        case 'Enter':
            event.preventDefault()
            if (selectedIndex.value >= 0 && selectedIndex.value < filteredCities.value.length) {
                selectCity(filteredCities.value[selectedIndex.value])
            }
            break
        case 'Escape':
            isOpen.value = false
            selectedIndex.value = -1
            inputRef.value?.blur()
            break
    }
}

const selectCity = (city: City) => {
    const cityString = `${city.name}, ${city.state}`
    inputValue.value = cityString
    emit('update:modelValue', cityString)
    isOpen.value = false
    selectedIndex.value = -1

    nextTick(() => {
        inputRef.value?.blur()
    })
}

const clearInput = () => {
    inputValue.value = ''
    emit('update:modelValue', '')
    isOpen.value = false
    selectedIndex.value = -1

    nextTick(() => {
        inputRef.value?.focus()
    })
}
</script>