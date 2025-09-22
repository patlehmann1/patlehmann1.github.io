"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

interface NewsletterSignupProps {
  className?: string;
}

export function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterForm) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // ConvertKit V4 API form subscription
      const response = await fetch('https://api.kit.com/v4/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Kit-Api-Key': 'kit_b2fd0c187a0e1a34f4af47b881a7f53c'
        },
        body: JSON.stringify({
          email_address: data.email,
          first_name: data.firstName,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`bg-primary/5 border border-primary/20 rounded-lg p-6 ${className}`}
      >
        <div className="flex items-center gap-3 text-primary">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-1">Thanks for subscribing!</h3>
            <p className="text-sm text-muted-foreground">
              You&apos;ll hear from me when I publish something new.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-primary/5 border border-primary/20 rounded-lg p-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
          <Mail className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-primary">Stay Updated</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get notified when I publish new articles about development, technology, and the intersection of faith and code. No spam, just thoughtful content.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  {...register("firstName")}
                  type="text"
                  placeholder="First name"
                  className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
                {errors.firstName && (
                  <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email address"
                  className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive text-sm"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>Something went wrong. Please try again.</span>
              </motion.div>
            )}

            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}