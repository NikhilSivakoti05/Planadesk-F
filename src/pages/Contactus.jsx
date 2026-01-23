import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Send,
  Check,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageCircle,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as LabelPrimitive from "@radix-ui/react-label";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

const cn = (...inputs) => twMerge(clsx(inputs));

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = "Label";

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = "AccordionContent";

const PremiumCard = ({ children, className = "", variant = "glass", glow = false }) => {
  const variants = {
    glass: "bg-white border border-black/10 shadow-lg",
    gradient: "bg-white border border-black/15 shadow-xl",
    elevated: "bg-white border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]",
  };

  const glowEffect = glow ? "shadow-[0_0_60px_rgba(0,0,0,0.1)] ring-2 ring-black/5" : "";

  return (
    <motion.div
      className={`rounded-none p-8 ${variants[variant]} ${glowEffect} ${className}`}
      whileHover={{ y: -4, scale: 1.01, transition: { type: "spring", stiffness: 300 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

const faqs = [
  {
    question: "How quickly will you respond to my enquiry?",
    answer:
      "We typically respond within one business day. For urgent questions about bookings or rollouts, mention that in your message and we'll prioritise it.",
  },
  {
    question: "Can I book Plan A Desk for a single unit?",
    answer:
      "Yes. Whether you're a solo professional or a large team, you can start with one unit and scale later.",
  },
  {
    question: "Do you support international enquiries?",
    answer:
      "Yes, we work with professionals and organisations across the globe. Just share your country, city, and use case, and we'll guide you on options.",
  },
  {
    question: "Can I see Plan A Desk in action before buying?",
    answer:
      "You can request a demo video, schedule a virtual walkthrough, or visit our experience partner spaces where available.",
  },
  {
    question: "Is Plan A Desk customisable for my profession?",
    answer:
      "We're building an ecosystem of configurations and accessories. Tell us about your workflow and we'll suggest the closest fit—or note your needs for future releases.",
  },
];

const PremiumFAQSection = () => {
  return (
    <section className="py-24 md:py-32 lg:py-40 px-4 md:px-6 lg:px-12 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="luxury-divider" style={{ width: "24px" }} />
            <span className="premium-badge">Frequently Asked Questions</span>
            <div className="luxury-divider" style={{ width: "24px" }} />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none font-bold text-black mb-8" style={{ fontFamily: "var(--font-heading)" }}>
            Common Questions,
            <br />
            <span className="block">Clear Answers</span>
          </h2>
          <p className="text-lg lg:text-xl text-black/70 leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
            Everything you need to know about Plan A Desk. Still have questions? Reach out directly.
          </p>
        </motion.div>

        <div className="space-y-4 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white border border-black/10 rounded-none px-6 md:px-8 py-4 shadow-sm hover:shadow-md hover:border-black/20 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline text-black text-base md:text-lg py-4" style={{ fontFamily: "var(--font-heading)" }}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-black/70 text-sm md:text-base leading-relaxed pb-4" style={{ fontFamily: "var(--font-body)" }}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  messageType: "enquiry",
  productName: "",
  productNameCustom: "",
  quantity: "",
  message: "",
  country: "",
  otherCountry: "",
};

const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().min(7).max(20),
    address: z.string().trim().max(300).optional(),
    messageType: z.enum(["booking", "enquiry"]),
    productName: z.string().trim().optional(),
    productNameCustom: z.string().trim().optional(),
    quantity: z.string().trim().optional(),
    message: z.string().trim().min(10).max(2000),
    country: z.string().min(1),
    otherCountry: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.messageType === "booking") {
      if (!data.address?.trim()) ctx.addIssue({ path: ["address"], message: "Address is required", code: "custom" });
      if (!data.productName?.trim()) ctx.addIssue({ path: ["productName"], message: "Product required", code: "custom" });
      if (!data.quantity?.trim()) ctx.addIssue({ path: ["quantity"], message: "Quantity required", code: "custom" });
    }
    if (data.country === "other" && !data.otherCountry?.trim())
      ctx.addIssue({ path: ["otherCountry"], message: "Enter country", code: "custom" });
    if (data.productName === "other" && !data.productNameCustom?.trim())
      ctx.addIssue({ path: ["productNameCustom"], message: "Enter product name", code: "custom" });
  });

const PremiumContactUs = () => {
  const scrollToForm = () => {
    const node = document.getElementById("contact-form");
    if (node) node.scrollIntoView({ behavior: "smooth" });
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCountryChange = (value) => {
    setFormData((p) => ({ ...p, country: value, otherCountry: value === "other" ? p.otherCountry : "" }));
    if (errors.country) setErrors((p) => ({ ...p, country: "" }));
    if (value !== "other" && errors.otherCountry) setErrors((p) => ({ ...p, otherCountry: "" }));
  };

  const handleProductChange = (value) => {
    setFormData((p) => ({ ...p, productName: value, productNameCustom: value === "other" ? p.productNameCustom : "" }));
    if (errors.productName) setErrors((p) => ({ ...p, productName: "" }));
    if (value !== "other" && errors.productNameCustom) setErrors((p) => ({ ...p, productNameCustom: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleMessageTypeChange = (type) => {
    setFormData((p) => ({ ...p, messageType: type }));
    if (errors.messageType) setErrors((p) => ({ ...p, messageType: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    try {
      const validated = contactSchema.parse(formData);
      const finalCountry = validated.country === "other" ? validated.otherCountry || "Other" : validated.country;
      const finalProductName = validated.productName === "other" ? validated.productNameCustom || "" : validated.productName || "";

      await emailjs.send(
        "service_fc8foun",
        "template_q2kks4l",
        {
          name: validated.name,
          first_name: validated.name.split(" ")[0] || validated.name,
          last_name: validated.name.split(" ").slice(1).join(" "),
          email: validated.email,
          phone_number: validated.phone,
          time: new Date().toLocaleString(),
          messageType: validated.messageType,
          country: finalCountry,
          address: validated.address || "",
          productName: finalProductName,
          quantity: validated.quantity || "",
          message: validated.message,
        },
        "iU_lKaSn15tUCQCbi",
      );

      toast.success("Message sent successfully!");
      setFormData(initialFormData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fe = {};
        error.errors.forEach((er) => {
          if (er.path[0]) fe[er.path[0]] = er.message;
        });
        setErrors(fe);
        toast.error("Please check the form");
      } else {
        console.error(error);
        toast.error("Something went wrong.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap');
        
        :root {
          --font-heading: 'Montserrat', sans-serif;
          --font-body: 'Roboto', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-heading);
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        body, p, span, div, button {
          font-family: var(--font-body);
        }
        
        .luxury-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #000000, transparent);
          opacity: 0.15;
        }
        
        .premium-badge {
          font-family: var(--font-body);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #666666;
          font-weight: 600;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-black/2" />

        <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl mx-auto space-y-8 md:space-y-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-3"
            >
              <div className="luxury-divider" style={{ width: "24px" }} />
              <span className="premium-badge">Get in Touch</span>
              <div className="luxury-divider" style={{ width: "24px" }} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none text-black font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              Let&apos;s Expand
              <br />
              <span className="block">Your Business</span>
            </motion.h1>

            <div className=" mx-auto bg-[#D84315]" style={{ width: "100px", height: "2px" }} />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg md:text-xl text-black/70 max-w-3xl mx-auto leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                lineHeight: "1.8",
              }}
            >
              Professional portable workstations designed for mobile beauty professionals, 
              service experts, and consultants who refuse to compromise on professionalism—anywhere in the world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="group relative px-10 md:px-12 py-4 md:py-5 bg-black text-white font-semibold text-base rounded-none shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300"
                style={{
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.05em",
                }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative flex items-center justify-center gap-3">
                  <span>Start Conversation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const node = document.getElementById("faq");
                  if (node) node.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-10 md:px-12 py-4 md:py-5 bg-white border-2 border-black text-black rounded-none font-semibold text-base transition-all duration-300 hover:bg-black/2"
                style={{
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.05em",
                }}
              >
                View FAQs
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="contact-form" className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 relative bg-gray-200">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="luxury-divider" style={{ width: "24px" }} />
              <span className="premium-badge">Contact Form</span>
              <div className="luxury-divider" style={{ width: "24px" }} />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none font-bold text-black mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              {formData.messageType === "booking"
                ? "Book Your Workspace"
                : "Connect With Us"}
            </h2>
            <p className="text-lg lg:text-xl text-black/70 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              {formData.messageType === "booking"
                ? "Share your details and we'll craft the perfect solution for your business."
                : "Experience premium support with personalized attention to your needs."}
            </p>
          </motion.div>

          <PremiumCard variant="gradient" glow className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label className="text-base font-semibold text-black" style={{ fontFamily: "var(--font-heading)" }}>
                  How can we serve you today? *
                </Label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    onClick={() => handleMessageTypeChange("booking")}
                    className={`p-4 md:p-5 rounded-none border-2 transition-all duration-300 text-sm md:text-base font-semibold ${
                      formData.messageType === "booking"
                        ? "bg-black text-white border-black shadow-lg"
                        : "bg-white text-black border-black/20 hover:border-black/40 hover:bg-black/2"
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <div className="text-center">
                      <div className="font-bold mb-1">Book Product</div>
                      <div className="text-xs opacity-80">Reserve your Plan A Desk</div>
                    </div>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => handleMessageTypeChange("enquiry")}
                    className={`p-4 md:p-5 rounded-none border-2 transition-all duration-300 text-sm md:text-base font-semibold ${
                      formData.messageType === "enquiry"
                        ? "bg-black text-white border-black shadow-lg"
                        : "bg:white text-black border-black/20 hover:border-black/40 hover:bg-black/2"
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <div className="text-center">
                      <div className="font-bold mb-1">Ask Question</div>
                      <div className="text-xs opacity-80">Expert guidance & support</div>
                    </div>
                  </motion.button>
                </div>
                {errors.messageType && (
                  <p className="text-red-500 text-sm font-medium">{errors.messageType}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-medium text-black" style={{ fontFamily: "var(--font-heading)" }}>
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`h-11 border-2 rounded-none px-4 ${
                      errors.name 
                        ? "border-red-400 focus:border-red-500" 
                        : "border-black/20 focus:border-black"
                    } bg-white transition-all duration-300`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm font-medium">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-medium text-black" style={{ fontFamily: "var(--font-heading)" }}>
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`h-11 border-2 rounded-none px-4 ${
                      errors.email 
                        ? "border-red-400 focus:border-red-500" 
                        : "border-black/20 focus:border-black"
                    } bg:white transition-all duration-300`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm font-medium">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-sm font-medium text-black" style={{ fontFamily: "var(--font-heading)" }}>
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={`h-11 border-2 rounded-none px-4 ${
                      errors.phone 
                        ? "border-red-400 focus:border-red-500" 
                        : "border-black/20 focus:border-black"
                    } bg-white transition-all duration-300`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm font-medium">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium text-black" style={{ fontFamily: "var(--font-heading)" }}>
                    Country *
                  </Label>
                  <Select value={formData.country} onValueChange={handleCountryChange}>
                    <SelectTrigger
                      className={`h-11 border-2 rounded-none px-4 ${
                        errors.country 
                          ? "border-red-400 focus:border-red-500" 
                          : "border-black/20 focus:border-black"
                      } bg-white transition-all duration-300`}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-black/20 rounded-none" style={{ fontFamily: "var(--font-body)" }}>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="bahamas">Bahamas</SelectItem>
                      <SelectItem value="mexico">Mexico</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-red-500 text-sm font-medium">{errors.country}</p>
                  )}
                </div>
              </div>

              {formData.country === "other" && (
                <div className="space-y-3">
                  <Label htmlFor="otherCountry" className="text-sm font-medium text-black" style={{ fontFamily: "var(--font-heading)" }}>
                    Enter your country *
                  </Label>
                  <Input
                    id="otherCountry"
                    name="otherCountry"
                    value={formData.otherCountry}
                    onChange={handleChange}
                    placeholder="Enter your country name"
                    className={`h-11 border-2 rounded-none px-4 ${
                      errors.otherCountry 
                        ? "border-red-400 focus:border-red-500" 
                        : "border-black/20 focus:border-black"
                    } bg-white transition-all duration-300`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {errors.otherCountry && (
                    <p className="text-red-500 text-sm font-medium">{errors.otherCountry}</p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="address" className="text-sm font-medium text-black" style={{ fontFamily: "var(--font-heading)" }}>
                  Address {formData.messageType === "booking" && <span className="text-red-500">*</span>}
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your full delivery / billing address"
                  rows={3}
                  className={`border-2 rounded-none px-4 py-2 ${
                    errors.address 
                      ? "border-red-400 focus:border-red-500" 
                      : "border-black/20 focus:border-black"
                  } bg-white transition-all duration-300`}
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm font-medium">{errors.address}</p>
                )}
              </div>

              {formData.messageType === "booking" && (
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-black" style={{ fontFamily: "var(--font-heading)" }}>
                      Product Configuration *
                    </Label>
                    <Select value={formData.productName} onValueChange={handleProductChange}>
                      <SelectTrigger
                        className={`h-11 border-2 rounded-none px-4 ${
                          errors.productName 
                            ? "border-red-400 focus:border-red-500" 
                            : "border-black/20 focus:border-black"
                        } bg-white transition-all duration-300`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2 border-black/20 rounded-none" style={{ fontFamily: "var(--font-body)" }}>
                        <SelectItem value="Basic Version">Basic Version</SelectItem>
                        <SelectItem value="Medium Version">Medium Version</SelectItem>
                        <SelectItem value="Premium Version">Premium Version</SelectItem>
                        <SelectItem value="Heat Tub">Heat Tub</SelectItem>
                        <SelectItem value="other">Other (enter manually)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.productName && (
                      <p className="text-red-500 text-sm font-medium">{errors.productName}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="quantity" className="text-sm font-medium text-black" style={{ fontFamily: "var(--font-heading)" }}>
                      Quantity *
                    </Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="1, 2, 3..."
                      className={`h-11 border-2 rounded-none px-4 ${
                        errors.quantity 
                          ? "border-red-400 focus:border-red-500" 
                          : "border-black/20 focus:border-black"
                      } bg-white transition-all duration-300`}
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm font-medium">{errors.quantity}</p>
                    )}
                  </div>
                </div>
              )}

              {formData.messageType === "booking" && formData.productName === "other" && (
                <div className="space-y-3">
                  <Label htmlFor="productNameCustom" className="text-sm font-medium text-black" style={{ fontFamily: "var(--font-heading)" }}>
                    Enter your product name *
                  </Label>
                  <Input
                    id="productNameCustom"
                    name="productNameCustom"
                    value={formData.productNameCustom}
                    onChange={handleChange}
                    placeholder="Custom configuration or request"
                    className={`h-11 border-2 rounded-none px-4 ${
                      errors.productNameCustom 
                        ? "border-red-400 focus:border-red-500" 
                        : "border-black/20 focus:border-black"
                    } bg-white transition-all duration-300`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {errors.productNameCustom && (
                    <p className="text-red-500 text-sm font-medium">{errors.productNameCustom}</p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="message" className="text-sm font-medium text-black" style={{ fontFamily: "var(--font-heading)" }}>
                  Your Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    formData.messageType === "booking"
                      ? "Tell us how you currently work, where you use Plan A Desk, and any timelines or special requirements."
                      : "Share your questions, use case, or anything you want us to understand about your work."
                  }
                  rows={6}
                  className={`border-2 rounded-none px-4 py-2 ${
                    errors.message 
                      ? "border-red-400 focus:border-red-500" 
                      : "border-black/20 focus:border-black"
                  } bg-white transition-all duration-300`}
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm font-medium">{errors.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full group bg-black hover:bg-black/90 disabled:bg-black/50 text-white font-semibold py-4 md:py-5 rounded-none text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={!isSubmitting ? { scale: 1.01, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                style={{
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.05em",
                }}
              >
                {isSubmitting
                  ? "Sending..."
                  : formData.messageType === "booking"
                  ? "Send Booking Request"
                  : "Send Message"}
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </PremiumCard>
        </div>
      </section>

      {/* SUPPORT CHANNELS SECTION */}
      <section className="py-24 md:py-32 lg:py-40 px-6 sm:px-8 lg:px-12 relative bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="luxury-divider" style={{ width: "24px" }} />
              <span className="premium-badge">Support Channels</span>
              <div className="luxury-divider" style={{ width: "24px" }} />
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none font-bold text-black mb-8" style={{ fontFamily: "var(--font-heading)" }}>
              Get in Touch
              <br />
              <span className="block">Your Way</span>
            </h2>
            <p className="text-lg lg:text-xl text-black/70 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Multiple channels to reach us. Choose what works best for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "Live Chat",
                description: "Quick answers for quick decisions",
              },
              {
                icon: Mail,
                title: "Email Support",
                description: "support@planadesk.com",
              },
              {
                icon: Phone,
                title: "Call Us",
                description: "+1 (555) 123-4567",
              },
              {
                icon: Clock,
                title: "Always On",
                description: "We align with your workday",
              },
            ].map((support, index) => {
              const Icon = support.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <PremiumCard variant="elevated" className="h-full flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-[#D84315] rounded-none flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-black mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                      {support.title}
                    </h3>
                    <p className="text-sm text-black/60" style={{ fontFamily: "var(--font-body)" }}>
                      {support.description}
                    </p>
                  </PremiumCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <div id="faq">
        <PremiumFAQSection />
      </div>
    </div>
  );
};

export default PremiumContactUs;

