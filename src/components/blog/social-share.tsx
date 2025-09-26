"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FacebookIcon } from "@/components/ui/icons/facebook-icon";
import { XIcon } from "@/components/ui/icons/x-icon";
import { LinkedInIcon } from "@/components/ui/icons/linkedin-icon";
import { Share2 } from "lucide-react";
import { BlogPost } from "@/lib/types";

interface SocialShareProps {
  post: BlogPost;
  className?: string;
}

export function SocialShare({ post, className }: SocialShareProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://patricklehmann.io";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=lehmann_dev2`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    const url = shareUrls[platform];
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-primary/5 border border-primary/20 rounded-lg p-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
          <Share2 className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2 text-primary">Share This Article</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Found this helpful? Share it with your network to help others discover it too.
          </p>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              <FacebookIcon className="h-4 w-4 mr-2" />
              Facebook
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('x')}
              className="hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-colors"
            >
              <XIcon className="h-4 w-4 mr-2" />
              X
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              <LinkedInIcon className="h-4 w-4 mr-2" />
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}