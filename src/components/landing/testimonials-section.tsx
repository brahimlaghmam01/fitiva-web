"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchReviews, submitReview, type Review } from "@/lib/api";

const roleSuggestions = ["Nutritionist", "Coach", "Personal Trainer", "User", "Student", "Athlete", "Yoga Instructor"];

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", content: "" });
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews().then(setReviews);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage(null);
    setSubmitError(null);
    try {
      const result = await submitReview({
        name: formData.name,
        email: formData.email || undefined,
        role: formData.role || undefined,
        content: formData.content,
        rating,
      });
      // Add the new review to the top of the list immediately
      if (result.review) {
        setReviews(prev => [result.review!, ...prev].slice(0, 9));
      }
      setSubmitMessage(result.message);
      setFormData({ name: "", email: "", role: "", content: "" });
      setRating(5);
      setTimeout(() => {
        setShowForm(false);
        setSubmitMessage(null);
      }, 3000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-4">
            Loved by{" "}
            <span className="text-primary">fitness enthusiasts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our community members have to say about their Fitiva experience.
          </p>
        </div>

        {/* Masonry-like Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid bg-[#f3f3f3] rounded-4xl p-8 flex flex-col gap-6"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, i) => (
                  <Star key={`empty-${i}`} className="w-5 h-5 text-neutral-300" />
                ))}
              </div>
              <p className="text-xl font-medium text-neutral-800 leading-snug">
                {review.content}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      review.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-black">{review.name}</p>
                    {review.role && (
                      <p className="text-sm text-neutral-500">{review.role}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Review Form Toggle & Submission */}
        <div className="mt-12 text-center">
          {!showForm ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-black text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all"
            >
              Write a Review
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-linear-to-br from-white to-neutral-50 rounded-4xl p-8 md:p-10 shadow-xl border border-neutral-200 text-left">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-black">Share your experience</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Star Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Rating</label>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-all duration-150 hover:scale-110"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= (hoverRating || rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-neutral-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-neutral-400"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Role with suggestions */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-neutral-400"
                      placeholder="e.g. Nutritionist, Coach, Personal Trainer, User..."
                      list="role-suggestions"
                    />
                    <datalist id="role-suggestions">
                      {roleSuggestions.map((role) => (
                        <option key={role} value={role} />
                      ))}
                    </datalist>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Email (optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-neutral-400"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Review Content */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">Review *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none placeholder:text-neutral-400"
                      placeholder="Tell us about your experience with Fitiva..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-linear-to-r from-primary to-secondary text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      "Submit Review"
                    )}
                  </motion.button>

                  {submitMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-600 text-sm text-center bg-green-50 rounded-xl py-3"
                    >
                      {submitMessage}
                    </motion.p>
                  )}
                  {submitError && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 text-sm text-center bg-red-50 rounded-xl py-3"
                    >
                      {submitError}
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}