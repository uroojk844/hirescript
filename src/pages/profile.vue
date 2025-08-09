<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import MaxWidth from "@/components/MaxWidth.vue";
import NavBar from "@/components/NavBar.vue";
import EditProfile from "@/components/Profile/Edit/EditProfile.vue";
import LinkedAcccounts from "@/components/Profile/LinkedAcccounts.vue";
import ProfileSocials from "@/components/Profile/ProfileSocials.vue";
import SectionCard from "@/components/Profile/SectionCard.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user.store";

const userStore = useUserStore();

const edit = ref(false);
</script>

<template>
  <EditProfile v-if="edit" />

  <div class="bg-[#ecf4f6]">
    <MaxWidth>
      <NavBar />

      <section class="rounded-xl overflow-hidden">
        <div class="h-[160px] bg-gray-100 overflow-hidden max-sm:h-[100px]">
          <img
            src="https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>
        <div
          class="flex flex-col md:flex-row justify-between bg-white p-4 md:p-6 gap-4"
        >
          <div class="flex flex-col sm:flex-row items-start gap-4">
            <img
              src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
              class="w-20 h-20 sm:size-42 inline-block rounded-full -mt-20 sm:-mt-20"
            />
            <div class="grid gap-y-2">
              <div class="font-bold text-primary text-lg">{{ userStore.name }}</div>
              <div class="text-sm text-gray">Product designer @ Google</div>
              <div
                class="text-xs bg-[#c3dce3] text-primary text-center p-1 flex items-center justify-center gap-2 rounded"
              >
                <Icon
                  class="text-xl"
                  icon="material-symbols-light:location-on"
                />
                London, United Kingdom
              </div>
              <ProfileSocials class="mt-3" />
            </div>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <div
              class="flex flex-col sm:flex-row border border-gray-300 rounded-lg p-2 w-full max-sm:hidden md:w-auto"
            >
              <div
                class="text-sm p-3 pr-6 border-b sm:border-b-0 sm:border-r border-gray-300"
              >
                <div class="font-bold text-primary">Work</div>
                <div class="text-gray">Whitefield, Bangalore</div>
                <div class="text-gray">Karnataka</div>
              </div>
              <div class="text-sm p-3 pl-6">
                <div class="font-bold">Education</div>
                <div class="text-gray">Integral University, Lucknow</div>
                <div class="text-gray">Uttar Pradesh</div>
              </div>
            </div>

            <button
              @click="edit = true"
              class="text-white bg-primary px-4 py-3 rounded-lg font-medium text-sm w-full md:w-auto"
            >
              Edit profile
            </button>
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 max-sm:gap-0">
        <div class="col-span-1">
          <SectionCard title="Skills">
            <div class="flex gap-3 flex-wrap">
              <div class="rounded text-xs border py-0.5 px-2 border-gray-300">
                C++
              </div>
              <div class="rounded text-xs border py-0.5 px-2 border-gray-300">
                Java
              </div>
              <div class="rounded text-xs border py-0.5 px-2 border-gray-300">
                HTML
              </div>
              <div class="rounded text-xs border py-0.5 px-2 border-gray-300">
                React
              </div>
              <div class="rounded text-xs border py-0.5 px-2 border-gray-300">
                CSS
              </div>
              <div class="rounded text-xs border py-0.5 px-2 border-gray-300">
                App development
              </div>
            </div>
          </SectionCard>
          <SectionCard title="Portfolios">
            <ProfileSocials />
          </SectionCard>
          <SectionCard title="Linked accounts">
            <LinkedAcccounts />
          </SectionCard>
        </div>

        <div class="col-span-3">
          <div class="bg-white rounded-lg">
            <div
              class="flex text-sm gap-x-12 p-4 border-b border-gray-300 overflow-x-auto"
            >
              <div class="text-primary font-medium">Background</div>
              <div class="text-gray">Recommendations</div>
              <div class="text-gray">Following</div>
            </div>

            <div class="py-4 px-8">
              <section class="border-b border-gray-300 pb-4">
                <div class="text-primary pb-2 font-medium">About me</div>
                <div class="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                  vero quae a corrupti error vel soluta perspiciatis facilis
                  doloremque unde fugiat quis fugit qui ipsa eum non, harum
                  atque tenetur. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Amet vero quae a corrupti error vel soluta
                  perspiciatis facilis doloremque unde fugiat quis fugit qui
                  ipsa eum non, harum atque tenetur. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Amet vero quae a corrupti error
                  vel soluta perspiciatis facilis doloremque unde fugiat quis
                  fugit qui ipsa eum non, harum atque tenetur. Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Amet vero quae a
                  corrupti error vel soluta perspiciatis facilis doloremque unde
                  fugiat quis fugit qui ipsa eum non, harum atque tenetur. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Amet vero
                  quae a corrupti error vel soluta perspiciatis facilis
                  doloremque unde fugiat quis fugit qui ipsa eum non, harum
                  atque tenetur. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Amet vero quae a corrupti error vel soluta
                  perspiciatis facilis doloremque unde fugiat quis fugit qui
                  ipsa eum non, harum atque tenetur.
                </div>
              </section>

              <section class="border-b border-gray-300 py-4">
                <div class="text-primary pb-4 font-medium">Experience</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="flex items-center gap-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                      alt=""
                      class="size-16"
                    />
                    <div class="grid gap-y-1">
                      <div class="text-primary font-medium">Google</div>
                      <div class="text-primary">2024 - Present</div>
                      <div class="text-sm text-gray">
                        Senior software engineer
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/014/018/561/non_2x/amazon-logo-on-transparent-background-free-vector.jpg"
                      alt=""
                      class="size-16"
                    />
                    <div class="grid gap-y-1">
                      <div class="text-primary font-medium">Amazon</div>
                      <div class="text-primary">2022 - 2024</div>
                      <div class="text-sm text-gray">
                        Senior software engineer
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Firefox_logo%2C_2019.svg/1200px-Firefox_logo%2C_2019.svg.png"
                      alt=""
                      class="size-16"
                    />
                    <div class="grid gap-y-1">
                      <div class="text-primary font-medium">Firefox</div>
                      <div class="text-primary">2020 - 2022</div>
                      <div class="text-sm text-gray">
                        Senior software engineer
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Responsive portfolio image grid -->
              <section class="border-gray-300 py-4">
                <div class="text-primary pb-4 font-medium">Portfolio</div>
                <div
                  class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                  <img
                    src="https://i.pinimg.com/736x/17/d9/fe/17d9fe516c658a77922213fd2feaab85.jpg"
                    alt=""
                  />
                  <img
                    src="https://i.pinimg.com/736x/17/d9/fe/17d9fe516c658a77922213fd2feaab85.jpg"
                    alt=""
                  />
                  <img
                    src="https://i.pinimg.com/736x/17/d9/fe/17d9fe516c658a77922213fd2feaab85.jpg"
                    alt=""
                  />
                  <img
                    src="https://i.pinimg.com/736x/17/d9/fe/17d9fe516c658a77922213fd2feaab85.jpg"
                    alt=""
                  />
                  <img
                    src="https://i.pinimg.com/736x/17/d9/fe/17d9fe516c658a77922213fd2feaab85.jpg"
                    alt=""
                  />
                  <img
                    src="https://i.pinimg.com/736x/17/d9/fe/17d9fe516c658a77922213fd2feaab85.jpg"
                    alt=""
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <AppFooter />
    </MaxWidth>
  </div>
</template>
