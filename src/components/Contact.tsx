"use client";

import { useState } from "react";
import { format } from "date-fns";
import { hr } from "date-fns/locale";
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
import { MessageSquare, CalendarDays, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function InquiryForm() {
  return (
    <form className="space-y-6">
      <div>
        <Label
          htmlFor="inquiry-name"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          Ime i prezime *
        </Label>
        <Input
          id="inquiry-name"
          name="name"
          required
          className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>
      <div>
        <Label
          htmlFor="inquiry-email"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          Email *
        </Label>
        <Input
          id="inquiry-email"
          name="email"
          type="email"
          required
          className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>
      <div>
        <Label
          htmlFor="inquiry-phone"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          Telefon
        </Label>
        <Input
          id="inquiry-phone"
          name="phone"
          type="tel"
          className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>
      <div>
        <Label
          htmlFor="inquiry-message"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          Poruka *
        </Label>
        <Textarea
          id="inquiry-message"
          name="message"
          rows={5}
          required
          className="resize-none rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>
      <Button
        type="submit"
        className="w-full rounded-none bg-black px-8 py-6 text-xs uppercase tracking-[0.35em] text-white transition-colors hover:bg-zinc-800"
      >
        Pošalji poruku
      </Button>
    </form>
  );
}

function AppointmentForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  return (
    <form className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label
            htmlFor="appointment-name"
            className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
          >
            Ime i prezime *
          </Label>
          <Input
            id="appointment-name"
            name="name"
            required
            className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
          />
        </div>
        <div>
          <Label
            htmlFor="appointment-phone"
            className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
          >
            Telefon *
          </Label>
          <Input
            id="appointment-phone"
            name="phone"
            type="tel"
            required
            className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
          />
        </div>
      </div>

      <div>
        <Label
          htmlFor="appointment-email"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          Email *
        </Label>
        <Input
          id="appointment-email"
          name="email"
          type="email"
          required
          className="rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700">
            Odaberite datum *
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
                  format(selectedDate, "PPP", { locale: hr })
                ) : (
                  <span>Odaberite datum</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto border border-zinc-200 bg-white p-0 shadow-lg" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setCalendarOpen(false);
                }}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const day = date.getDay();
                  return date < today || day === 0;
                }}
                locale={hr}
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
            Odaberite vrijeme *
          </Label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full border border-zinc-300 bg-white px-4 py-3.5 text-sm text-zinc-900 focus:border-black focus:outline-none"
          >
            <option value="">Odaberite vrijeme</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label
          htmlFor="appointment-service"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          Vrsta usluge *
        </Label>
        <select
          id="appointment-service"
          name="service"
          required
          className="w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 focus:border-black focus:outline-none"
        >
          <option value="">Odaberite uslugu</option>
          <option value="consultation">Konzultacija</option>
          <option value="engraving">Lasersko graviranje</option>
          <option value="repair">Popravak nakita</option>
          <option value="custom">Izrada po narudžbi</option>
          <option value="appraisal">Procjena vrijednosti</option>
        </select>
      </div>

      <div>
        <Label
          htmlFor="appointment-notes"
          className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
        >
          Dodatne napomene
        </Label>
        <Textarea
          id="appointment-notes"
          name="notes"
          rows={3}
          placeholder="Opišite što vas zanima ili napišite posebne zahtjeve..."
          className="resize-none rounded-none border-zinc-300 px-4 py-3 text-sm focus:border-black focus-visible:ring-0"
        />
      </div>

      <Button
        type="submit"
        disabled={!selectedDate || !selectedTime}
        className="w-full rounded-none bg-black px-8 py-6 text-xs uppercase tracking-[0.35em] text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Rezerviraj termin
      </Button>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl tracking-[0.2em] sm:text-4xl">
            Kontaktirajte Nas
          </h2>
          <p className="mb-10 text-sm text-zinc-600 sm:text-base">
            Imate pitanje ili želite rezervirati privatni termin? Rado ćemo vam
            pomoći.
          </p>
          <div className="space-y-6 text-sm text-zinc-700">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Posjetite naš salon
              </p>
              <p>Trg Zlatarne 12, Zagreb 10000</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Nazovite nas
              </p>
              <p>+385 1 234 5678</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Email
              </p>
              <p>info@zlatarna-popovic.hr</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Radno vrijeme
              </p>
              <p>Pon - Pet: 09:00 - 18:00</p>
              <p>Sub: 09:00 - 14:00</p>
            </div>
          </div>
        </div>

        <div>
          <Tabs defaultValue="inquiry" className="w-full">
            <TabsList className="mb-6 grid h-auto w-full grid-cols-2 rounded-none bg-zinc-100 p-1">
              <TabsTrigger
                value="inquiry"
                className="flex items-center gap-2 rounded-none py-3 text-xs uppercase tracking-[0.2em] text-zinc-600 data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm"
              >
                <MessageSquare className="h-4 w-4" />
                Upit
              </TabsTrigger>
              <TabsTrigger
                value="appointment"
                className="flex items-center gap-2 rounded-none py-3 text-xs uppercase tracking-[0.2em] text-zinc-600 data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm"
              >
                <CalendarDays className="h-4 w-4" />
                Rezervacija
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
    </section>
  );
}
