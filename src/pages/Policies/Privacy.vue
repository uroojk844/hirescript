<script setup lang="ts">

import NavBar from "@/components/NavBar.vue";
import OutlinedCard from "@/components/OutlinedCard.vue";

import AppFooter from "@/components/AppFooter.vue";
import MaxWidth from "@/components/MaxWidth.vue";
import { onMounted } from "vue";


onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
    <MaxWidth>
    <section class="bg min-h-screen">
        <NavBar />
        <section>
            <main ref="top" class="grid lg:flex gap-4">
                <div class="contents lg:grid gap-4 content-start">
                    <section class="flex items-center gap-6 mb-2">
                        <div>
                            <div class="font-bold text-primary text-2xl capitalize">Privacy Policies</div>
                        </div>
                    </section>

                    <section>
                        <div class="text-gray">Introduction</div>
                        <OutlinedCard class="my-2 max-w-none">
                            <div>
                                Welcome to <strong>HireScript</strong>. Your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you access or use our website and services. By using HireScript, you agree to the terms outlined in this policy.
                            </div>
                        </OutlinedCard>
                    </section>

                    <section>
                        <div class="text-gray">Information We Collect</div>
                        <OutlinedCard class="my-2 max-w-none">
                            <ul class="list-disc list-inside space-y-2">
                                <li><strong>Personal Information:</strong> Name, email address, contact details, and other information provided during account registration.</li>
                                <li><strong>Usage Data:</strong> Information on how you interact with our website, including pages visited, time spent, and actions taken.</li>
                                <li><strong>Cookies:</strong> Small files stored on your device to improve site functionality and user experience.</li>
                            </ul>
                        </OutlinedCard>
                    </section>

                    <section>
                        <div class="text-gray">How We Use Your Information</div>
                        <OutlinedCard class="my-2 max-w-none">
                            <ul class="list-disc list-inside space-y-2">
                                <li>To provide and maintain our services.</li>
                                <li>To improve user experience and website functionality.</li>
                                <li>To communicate updates, offers, or important notices.</li>
                                <li>To comply with legal requirements.</li>
                            </ul>
                        </OutlinedCard>
                    </section>

                    <section>
                        <div class="text-gray">Data Security</div>
                        <OutlinedCard class="my-2 max-w-none">
                            <div>
                                We implement industry-standard security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure.
                            </div>
                        </OutlinedCard>
                    </section>

                    <section>
                        <div class="text-gray">Third-Party Services</div>
                        <OutlinedCard class="my-2 max-w-none">
                            <div>
                                HireScript may use trusted third-party tools and services to enhance our offerings. These providers have access to limited information necessary to perform their services but are obligated not to disclose or use it for any other purpose.
                            </div>
                        </OutlinedCard>
                    </section>

                    <section>
                        <div class="text-gray">Your Rights</div>
                        <OutlinedCard class="my-2 max-w-none">
                            <div>
                                You have the right to access, update, or delete your personal information. You can also opt out of receiving promotional communications at any time by contacting us.
                            </div>
                        </OutlinedCard>
                    </section>

                    <section>
                        <div class="text-gray">Changes to This Policy</div>
                        <OutlinedCard class="my-2 max-w-none">
                            <div>
                                We may update this Privacy Policy from time to time to reflect changes in our practices. We encourage you to review this page periodically for the latest information.
                            </div>
                        </OutlinedCard>
                    </section>

                    <section>
                        <div class="text-gray">Contact Us</div>
                        <OutlinedCard class="my-2 max-w-none">
                            <div>
                                If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us at <strong>@hirescript.work@gmail.com</strong>.
                            </div>
                        </OutlinedCard>
                    </section>
                </div>

                <div class="contents lg:grid gap-4 md:min-w-sm md:max-w-sm content-start">
                    <div>
                        <div class="mb-2">Company</div>
                        <OutlinedCard class="max-w-none">
                            <div class="font-bold">About HireScript</div>
                            <p class="text-gray text-xs">
                                HireScript is a platform dedicated to connecting talent with opportunity. Our mission is to simplify recruitment by providing an efficient, transparent, and user-friendly hiring process for both employers and job seekers.
                            </p>
                        </OutlinedCard>
                    </div>
                </div>
            </main>
            <AppFooter />
        </section>
    </section>
    </MaxWidth>
</template>

<style>
@reference "@/style.css";

.bg {
    background-image: linear-gradient(#fff0, #fff),
        url("@/assets/images/plus.svg");
    background-size: cover, 40px 40px;
}
</style>
