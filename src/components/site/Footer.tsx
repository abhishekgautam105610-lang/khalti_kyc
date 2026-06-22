import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  Send,
  ExternalLink,
} from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      "About Us",
      "Contact Us",
      "Help & support",
      "Careers",
      "Procurement",
      "Semi Annual Report 82/83",
    ],
  },
  {
    title: "Code of Conduct",
    links: [
      "Privacy Policy",
      "Dispute Policy",
      "Terms & Conditions",
      "Inactive/Dormant Account Policy",
      "Flight Fare Rules & Regulations",
    ],
  },
  {
    title: "Developer",
    links: [
      "Payment Gateway API Docs",
      "Open Source",
      "Billing Services API Docs",
    ],
  },
  {
    title: "Charges and Limit",
    links: ["Khalti Service Charge", "Transaction Limit"],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface-dark text-surface-dark-foreground">
      {/* Certifications */}
      <div className="mx-auto max-w-7xl px-6 pt-12 sm:px-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="rounded-md bg-white/5 px-4 py-3 text-center">
            <p className="text-2xl font-black tracking-tight">SISA</p>
            <p className="text-[11px] font-semibold tracking-wider text-white/80">
              PCI DSS CERTIFIED
            </p>
          </div>
          <div className="rounded-md bg-white px-4 py-3 text-center text-surface-dark">
            <p className="text-sm font-bold leading-tight">ISO 27001</p>
            <p className="text-[10px] font-semibold leading-tight text-indigo-700">
              Certified · Information Security Management
            </p>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {columns.map((c) => (
          <div key={c.title}>
            <h3 className="text-base font-bold">{c.title}</h3>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-white/70 transition-colors hover:text-primary"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-6 pb-10 sm:px-8">
        <Link
          to="/login"
          className="rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-surface-dark"
        >
          Join Khalti
        </Link>
        <Link
          to="/login"
          className="rounded-full px-8 py-3 text-sm font-semibold text-white transition-colors hover:text-primary"
        >
          Khalti Login
        </Link>
      </div>

      {/* Support */}
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 px-6 py-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        <div>
          <h3 className="text-base font-bold">Khalti Call Support</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>Toll Free: 1810-21-02102 (Ncell)</li>
            <li>Toll Free: 1660-01-5-8888 (NTC)</li>
            <li>Landline: 01-5970017</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold">Khalti Chat Support</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>Whatsapp: +9779801165561</li>
            <li>Viber: +9779801165561</li>
            <li>Email: support@khalti.cfd</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold">Khalti Grievance Officer</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>Name: Anil Tharu</li>
            <li>Call: +977 9801822841</li>
            <li>Email: grievance@khalti.cfd</li>
            <li className="flex items-center gap-1 font-semibold text-white">
              NRB Grievance Portal <ExternalLink className="h-3.5 w-3.5" />
            </li>
          </ul>
        </div>
      </div>

      {/* Connect */}
      <div className="bg-black/40 py-8">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <p className="text-center text-base font-semibold">
            Get Connected with us
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {[Facebook, Instagram, Linkedin, Twitter, Youtube, MessageCircle].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ),
            )}
          </div>
          <div className="mt-6 flex items-center justify-center gap-1.5 text-primary">
            <span className="text-xl font-extrabold">khalti</span>
            <Send className="h-3.5 w-3.5 -rotate-12 fill-primary" />
          </div>
          <p className="mt-3 text-center text-xs text-white/60">
            © 2026 IME Khalti Ltd. All rights reserved. ISO 27001: 2013
            Certified Company
          </p>
        </div>
      </div>
    </footer>
  );
}
