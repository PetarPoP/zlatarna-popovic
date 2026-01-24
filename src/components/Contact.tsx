"use client";

import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { hr, enUS } from "date-fns/locale";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, CalendarDays, CalendarIcon, MapPin, Phone, Mail, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        "expired-callback"?: () => void;
        "error-callback"?: () => void;
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  onVerify: (token: string) => void;
  onExpire: () => void;
};

function TurnstileWidget({ onVerify, onExpire }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey || !containerRef.current) return;

    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          "expired-callback": onExpire,
          "error-callback": onExpire,
        });
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onVerify, onExpire]);

  return <div ref={containerRef} className="my-4" />;
}

function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { t } = useLanguage();

  const isFormValid = formData.name.trim() !== "" && 
                      formData.email.trim() !== "" && 
                      formData.message.trim() !== "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Re-enable Turnstile after testing
    // if (!turnstileToken) {
    //   toast.error("Molimo dovršite sigurnosnu provjeru.");
    //   return;
    // }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      // turnstileToken, // TODO: Re-enable after testing
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(t.contact.successTitle, {
          description: t.contact.successInquiry,
        });
        formRef.current?.reset();
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(result.error || t.contact.errorMessage);
      }
    } catch {
      toast.error(t.contact.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label
          htmlFor="inquiry-name"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          {t.contact.nameLabel} *
        </Label>
        <Input
          id="inquiry-name"
          name="name"
          required
          value={formData.name}
          onChange={handleInputChange}
          placeholder={t.contact.namePlaceholder}
          className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>
      <div>
        <Label
          htmlFor="inquiry-email"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          {t.contact.emailLabel} *
        </Label>
        <Input
          id="inquiry-email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          placeholder={t.contact.emailPlaceholder}
          className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>
      <div>
        <Label
          htmlFor="inquiry-phone"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          {t.contact.phoneLabel}
        </Label>
        <Input
          id="inquiry-phone"
          name="phone"
          type="tel"
          placeholder={t.contact.phonePlaceholder}
          className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>
      <div>
        <Label
          htmlFor="inquiry-message"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          {t.contact.messageLabel} *
        </Label>
        <Textarea
          id="inquiry-message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleInputChange}
          placeholder={t.contact.messagePlaceholder}
          className="resize-none rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>
      
      {/* TODO: Re-enable Turnstile after testing
      <TurnstileWidget 
        onVerify={setTurnstileToken} 
        onExpire={() => setTurnstileToken(null)} 
      />
      */}

      <Button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full cursor-pointer rounded-lg bg-black px-8 py-6 text-xs uppercase tracking-[0.35em] text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? t.contact.sending : t.contact.send}
      </Button>
    </form>
  );
}

function AppointmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { t, language } = useLanguage();

  const dateLocale = language === "hr" ? hr : enUS;

  const isFormValid = formData.name.trim() !== "" && 
                      formData.email.trim() !== "" && 
                      formData.phone.trim() !== "" &&
                      selectedDate !== undefined &&
                      selectedTime !== "" &&
                      selectedService !== "";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const allTimes = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
  ];

  // Fetch booked times when date changes
  useEffect(() => {
    if (!selectedDate) {
      setBookedTimes([]);
      return;
    }

    const fetchBookedTimes = async () => {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      try {
        const response = await fetch(`/api/appointments?date=${dateStr}`);
        const result = await response.json();
        if (result.success) {
          setBookedTimes(result.bookedTimes);
        }
      } catch {
        console.error("Failed to fetch booked times");
      }
    };

    fetchBookedTimes();
  }, [selectedDate]);

  // Get available times based on day of week
  const getAvailableTimes = () => {
    if (!selectedDate) return allTimes;
    
    const dayOfWeek = selectedDate.getDay();
    // Saturday: only until 13:30
    if (dayOfWeek === 6) {
      return allTimes.filter((time) => time <= "13:30");
    }
    // Weekdays: until 14:00
    return allTimes.filter((time) => time < "14:00");
  };

  const displayTimes = getAvailableTimes();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Re-enable Turnstile after testing
    // if (!turnstileToken) {
    //   toast.error("Molimo dovršite sigurnosnu provjeru.");
    //   return;
    // }

    if (!selectedDate || !selectedTime) {
      toast.error(t.contact.errorMessage);
      return;
    }

    if (!selectedService) {
      toast.error(t.contact.errorMessage);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime,
      service: selectedService,
      notes: formData.get("notes") as string,
      // turnstileToken, // TODO: Re-enable after testing
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        const formattedDate = format(selectedDate, "d. MMMM yyyy.", { locale: dateLocale });
        toast.success(t.contact.successTitle, {
          description: t.contact.successReservation,
        });
        formRef.current?.reset();
        setSelectedDate(undefined);
        setSelectedTime("");
        setSelectedService("");
        setFormData({ name: "", email: "", phone: "" });
      } else {
        toast.error(result.error || t.contact.errorMessage);
      }
    } catch {
      toast.error(t.contact.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label
            htmlFor="appointment-name"
            className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
          >
            {t.contact.nameLabel} *
          </Label>
          <Input
            id="appointment-name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t.contact.namePlaceholder}
            className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
          />
        </div>
        <div>
          <Label
            htmlFor="appointment-phone"
            className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
          >
            {t.contact.phoneLabel} *
          </Label>
          <Input
            id="appointment-phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={t.contact.phonePlaceholder}
            className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="appointment-email"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          {t.contact.emailLabel} *
        </Label>
        <Input
          id="appointment-email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          placeholder={t.contact.emailPlaceholder}
          className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700">
            {t.contact.dateLabel} *
          </Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start rounded-none border-zinc-300 bg-white px-4 py-6 text-left text-sm font-normal text-zinc-900 hover:bg-zinc-50",
                  !selectedDate && "text-zinc-500"
                )}
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-zinc-500" />
                {selectedDate ? (
                  format(selectedDate, "PPP", { locale: dateLocale })
                ) : (
                  <span>{t.contact.datePlaceholder}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto border border-zinc-200 bg-white p-0 shadow-lg" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(""); // Reset time when date changes
                  setCalendarOpen(false);
                }}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const day = date.getDay();
                  // Disable past dates and Sundays
                  return date < today || day === 0;
                }}
                locale={dateLocale}
                className="rounded-md bg-white p-3 text-zinc-900"
                classNames={{
                  months: "bg-white",
                  month: "bg-white",
                  table: "bg-white w-full border-collapse",
                  head_row: "bg-white",
                  row: "bg-white",
                  cell: "bg-white text-center p-0",
                  day: "h-9 w-9 text-zinc-900 hover:bg-zinc-100 rounded-md",
                  day_selected: "bg-black text-white hover:bg-zinc-800",
                  day_today: "bg-zinc-100 text-zinc-900 font-semibold",
                  day_outside: "text-zinc-400",
                  day_disabled: "text-zinc-300 opacity-50",
                  head_cell: "text-zinc-500 font-normal text-xs w-9",
                  caption: "text-zinc-900 font-medium",
                  caption_label: "text-sm font-medium text-zinc-900",
                  nav: "flex items-center",
                  nav_button: "h-7 w-7 bg-transparent text-zinc-700 hover:bg-zinc-100 rounded-md flex items-center justify-center",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700">
            {t.contact.timeLabel} *
          </Label>
          <Select
            value={selectedTime}
            onValueChange={setSelectedTime}
            disabled={!selectedDate}
          >
            <SelectTrigger className="w-full rounded-none border-zinc-300 bg-white px-4 py-6 text-sm focus:ring-0 focus:border-black">
              <SelectValue placeholder={t.contact.timePlaceholder} />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="bg-white border-zinc-200">
              {displayTimes.length === 0 && selectedDate ? (
                <SelectItem value="none" disabled>
                  {language === "hr" ? "Nema dostupnih termina" : "No available times"}
                </SelectItem>
              ) : (
                displayTimes.map((time) => {
                  const isBooked = bookedTimes.includes(time);
                  return (
                    <SelectItem
                      key={time}
                      value={time}
                      disabled={isBooked}
                      className={isBooked ? "line-through text-zinc-400" : ""}
                    >
                      {time}{isBooked ? (language === "hr" ? " (zauzeto)" : " (booked)") : ""}
                    </SelectItem>
                  );
                })
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700">
          {t.contact.serviceLabel} *
        </Label>
        <Select value={selectedService} onValueChange={setSelectedService}>
          <SelectTrigger className="w-full rounded-none border-zinc-300 bg-white px-4 py-6 text-sm focus:ring-0 focus:border-black">
            <SelectValue placeholder={t.contact.servicePlaceholder} />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4} className="bg-white border-zinc-200">
            <SelectItem value="consultation">{t.contact.serviceConsultation}</SelectItem>
            <SelectItem value="engraving">{t.contact.serviceEngraving}</SelectItem>
            <SelectItem value="repair">{t.contact.serviceRepair}</SelectItem>
            <SelectItem value="custom">{t.contact.serviceCustom}</SelectItem>
            <SelectItem value="appraisal">{t.contact.serviceAppraisal}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label
          htmlFor="appointment-notes"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          {t.contact.messageLabel}
        </Label>
        <Textarea
          id="appointment-notes"
          name="notes"
          rows={3}
          placeholder={t.contact.messagePlaceholder}
          className="resize-none rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>

      {/* TODO: Re-enable Turnstile after testing
      <TurnstileWidget 
        onVerify={setTurnstileToken} 
        onExpire={() => setTurnstileToken(null)} 
      />
      */}

      <Button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        className="w-full cursor-pointer rounded-lg bg-black px-8 py-6 text-xs uppercase tracking-[0.35em] text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? t.contact.sending : t.contact.reserve}
      </Button>
    </form>
  );
}

export function Contact() {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl tracking-[0.2em] sm:text-4xl">
              {t.contact.title}
            </h2>
            <p className="mb-10 text-sm text-zinc-600 sm:text-base">
              {t.contact.description}
            </p>
            <div className="space-y-6 text-sm text-zinc-700">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    {t.contact.visitUs}
                  </p>
                  <p>{t.contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    {t.contact.phoneLabel}
                  </p>
                  <a href="tel:+38763330632" className="hover:underline">
                    +387 63 330 632
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    {t.contact.emailLabel}
                  </p>
                  <a href="mailto:info@zlatarna-popovic.ba" className="hover:underline">
                    info@zlatarna-popovic.ba
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-zinc-400" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                    {t.contact.workingHours}
                  </p>
                  <p>{t.contact.weekdays}</p>
                  <p>{t.contact.saturday}</p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="mt-8">
              <div className="aspect-video w-full overflow-hidden border border-zinc-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.8889!2d17.0069!3d43.8269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475f9a8c8e8e8e8e%3A0x0!2sKneza%20Mutimira%2027%2C%20Livno!5e0!3m2!1shr!2sba!4v1700000000000!5m2!1shr!2sba"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokacija Zlatarne Popović"
                />
              </div>
            </div>
          </div>

          <div>
            <Tabs defaultValue="inquiry" className="w-full">
              <TabsList className="mb-6 grid h-auto w-full grid-cols-2 rounded-lg bg-transparent p-0 gap-2">
                <TabsTrigger
                  value="inquiry"
                  className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-transparent py-3 text-xs uppercase tracking-[0.2em] text-zinc-600 transition-all data-[state=active]:border-zinc-900 data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
                  <MessageSquare className="h-4 w-4" />
                  {t.contact.inquiryTab}
                </TabsTrigger>
                <TabsTrigger
                  value="appointment"
                  className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-transparent py-3 text-xs uppercase tracking-[0.2em] text-zinc-600 transition-all data-[state=active]:border-zinc-900 data-[state=active]:bg-zinc-900 data-[state=active]:text-white"
                >
                  <CalendarDays className="h-4 w-4" />
                  {t.contact.reservationTab}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="inquiry">
                <InquiryForm />
              </TabsContent>
              <TabsContent value="appointment">
                <AppointmentForm />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
