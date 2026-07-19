export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-8">
          Privacy Policy
        </h1>
        <div className="space-y-8 text-muted-foreground/90">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you use our services, create an account, or interact with our website. This may include your name, email address, phone number, and any other information you choose to provide.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you, process transactions, and send you technical notices, updates, and security alerts.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Information Sharing</h2>
            <p>
              We do not share your personal information with third parties except as described in this privacy policy, such as with your consent, to comply with laws, or to protect our rights and property.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Changes to this Policy</h2>
            <p>
              We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
