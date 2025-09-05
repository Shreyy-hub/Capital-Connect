import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      alert('Enter a valid email');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Enter a valid email');
      return;
    }
    
    // Save email to Supabase
    const { error } = await supabase
      .from('email_subscribers')
      .insert([{ email: email.trim() }]);
    
    if (error) {
      if (error.code === '23505') {
        alert('This email is already subscribed!');
      } else {
        alert('Something went wrong. Please try again.');
      }
      return;
    }
    
    setShowSuccess(true);
    setEmail('');
    
    // Hide success message after 4 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Main container */}
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Brand title with glow effect */}
        <h1 className="brand-title mb-4 leading-tight">
          Capital Connect
        </h1>
        
        {/* Tagline */}
        <p className="brand-tagline mb-12">
          You Pitch. We Connect.
        </p>
        
        {/* Email input form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="email-input flex-1 max-w-md"
            required
          />
          <button
            type="submit"
            className="submit-button whitespace-nowrap"
          >
            Submit
          </button>
        </form>
        
        {/* Success message with glass effect */}
        {showSuccess && (
          <div className="success-glass-box animate-fade-in">
            <p className="success-message">
              Your email has been recorded!<br />
              Thank you!
            </p>
          </div>
        )}
      </div>
      
      {/* Footer with privacy policy */}
      <footer className="absolute bottom-8 text-center">
        <a 
          href="#privacy" 
          className="privacy-link"
          onClick={(e) => {
            e.preventDefault();
            alert('Privacy Policy: We collect and process your email address in accordance with GDPR regulations. Your data will be used solely for connecting startups with investors. You can request deletion of your data at any time by contacting us.');
          }}
        >
          Privacy Policy
        </a>
      </footer>
    </div>
  );
};

export default Index;
