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
                <div class="font-bold text-primary text-2xl capitalize">Terms of Use</div>
              </div>
            </section>

            <section>
              <div class="text-gray font-bold">Introduction</div>
              
                <div class="text-gray">
                  Welcome to <strong>HireScript</strong>. These Terms of Use govern your access to and use of our website and services.
                  By using HireScript, you agree to comply with and be bound by these terms.
                </div>
            </section>

            <section>
              <div class="text-gray font-bold">Eligibility</div>
              
                <div class="text-gray">
                  You must be at least 18 years old or have the consent of a parent or guardian to use our services.
                  By using HireScript, you confirm that you meet these eligibility requirements.
                </div>
            </section>

            <section>
              <div class="text-gray font-bold">User Responsibilities</div>
              
                <ul class="list-disc list-inside space-y-2 text-gray">
                  <li>Provide accurate and up-to-date information during registration and profile creation.</li>
                  <li>Use the platform only for lawful purposes.</li>
                  <li>Respect the intellectual property rights of others.</li>
                  <li>Refrain from any fraudulent, abusive, or harmful activities.</li>
                </ul>
            </section>

            <section>
              <div class="text-gray font-bold">Prohibited Activities</div>
              
                <ul class="list-disc list-inside space-y-2 text-gray">
                  <li>Posting false, misleading, or defamatory information.</li>
                  <li>Attempting to hack, disrupt, or gain unauthorized access to our systems.</li>
                  <li>Spamming or sending unsolicited messages to other users.</li>
                  <li>Copying, modifying, or distributing platform content without permission.</li>
                </ul>
            </section>

            <section>
              <div class="text-gray font-bold">Intellectual Property</div>
              
                <div class="text-gray">
                  All content, trademarks, and designs on HireScript are owned by or licensed to us.
                  You may not reproduce, distribute, or use our content without prior written consent.
                </div>
            </section>

            <section>
              <div class="text-gray font-bold">Limitation of Liability</div>
              
                <div class="text-gray">
                  HireScript is not responsible for any damages, losses, or disputes that arise from the use of our platform.
                  We provide our services "as is" without any warranties, express or implied.
                </div>
            </section>

            <section>
              <div class="text-gray font-bold">Changes to These Terms</div>
              
                <div class="text-gray">
                  We reserve the right to update or modify these Terms of Use at any time.
                  Continued use of the platform after changes are posted constitutes acceptance of the revised terms.
                </div>
            </section>

            <section>
              <div class="text-gray font-bold">Contact Us</div>
              
                <div class="text-gray">
                  For any questions or concerns regarding these Terms of Use, please contact us at <strong>hirescript.work@gmail.com</strong>.
                </div>
            </section>
          </div>

          <!-- <div class="contents lg:grid gap-4 md:min-w-sm md:max-w-sm content-start">
            <div>
              <div class="mb-2">Company</div>
              <OutlinedCard class="max-w-none">
                <div class="font-bold">About HireScript</div>
                <p class="text-gray text-xs">
                  HireScript is a platform dedicated to connecting talent with opportunity. Our mission is to simplify recruitment
                  by providing an efficient, transparent, and user-friendly hiring process for both employers and job seekers.
                </p>
              </OutlinedCard>
            </div>
          </div> -->
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
