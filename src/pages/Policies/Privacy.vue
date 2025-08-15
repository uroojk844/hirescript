<script setup lang="ts">

import NavBar from "@/components/NavBar.vue";

import AppFooter from "@/components/AppFooter.vue";
import MaxWidth from "@/components/MaxWidth.vue";
import { onMounted } from "vue";


onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
    
    <section class="bg min-h-screen">
        <NavBar />
        <section>
            <MaxWidth>
            <main ref="top" class="grid lg:flex gap-4">
                
                <div class="contents lg:grid gap-4 content-start">
                    <section class="flex items-center gap-6 mb-2">
                        <div>
                            <div class="font-bold text-primary text-2xl capitalize">Privacy Policies</div>
                        </div>
                    </section>
                    <section>
                        <div class="text-gray font-bold">Introduction</div>
                        
                            <div class="text-gray">
                                Welcome to <strong>HireScript</strong>. Your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you access or use our website and services. By using HireScript, you agree to the terms outlined in this policy.
                            </div>
                        
                    </section>

                    <section>
                        <div class="text-gray font-bold">Information We Collect</div>
                        
                            <ul class="text-gray list-disc list-inside space-y-2">
                                <li><strong>Personal Information:</strong> Name, email address, contact details, and other information provided during account registration.</li>
                                <li><strong>Usage Data:</strong> Information on how you interact with our website, including pages visited, time spent, and actions taken.</li>
                                <li><strong>Cookies:</strong> Small files stored on your device to improve site functionality and user experience.</li>
                            </ul>
                        
                    </section>

                    <section>
                        <div class="text-gray font-bold">How We Use Your Information</div>
                        
                            <ul class="text-gray list-disc  list-inside space-y-2">
                                <li>To provide and maintain our services.</li>
                                <li>To improve user experience and website functionality.</li>
                                <li>To communicate updates, offers, or important notices.</li>
                                <li>To comply with legal requirements.</li>
                            </ul>
                       
                    </section>

                    <section>
                        <div class="text-gray font-bold">Data Security</div>
                        
                            <div class="text-gray">
                                We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure.
                            </div>
                       
                    </section>

                    <section>
                        <div class="text-gray font-bold">Third-Party Services</div>
                        
                            <div class="text-gray">
                                HireScript may use trusted third-party tools and services to enhance our offerings. These providers have access to limited information necessary to perform their services but are obligated not to disclose or use it for any other purpose.
                            </div>
                       
                    </section>

                    <section>
                        <div class="text-gray font-bold">Your Rights</div>
                        
                            <div class="text-gray">
                                You have the right to access, update, or delete your personal information. You can also opt out of receiving promotional communications at any time by contacting us.
                            </div>
                        
                    </section>

                    <section>
                        <div class="text-gray font-bold">Changes to This Policy</div>
                        
                            <div class="text-gray">
                                We may update this Privacy Policy from time to time to reflect changes in our practices. We encourage you to review this page periodically for the latest information.
                            </div>
                        
                    </section>

                    <section>
                        <div class="text-gray font-bold">Contact Us</div>
                        
                            <div class="text-gray">
                                If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at <strong>@hirescript.work@gmail.com</strong>.
                            </div>
                        
                    </section>

                    
                </div>
            </main>
            </MaxWidth>
            <AppFooter />
        </section>
    </section>
    
</template>

<style>
@reference "@/style.css";

.bg {
    background-image: linear-gradient(#fff0, #fff),
        url("@/assets/images/plus.svg");
    background-size: cover, 40px 40px;
}
</style>
