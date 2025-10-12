'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wallet } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/cards', label: 'Cartões' },
    { href: '/receipts', label: 'Comprovantes' },
    { href: '/relatorios', label: 'Relatórios' },
    { href: '/usuarios', label: 'Usuários' },
    { href: '/configuracoes', label: 'Configurações' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="flex justify-center w-full">
        <div className="flex items-center gap-8 h-16 px-5">

          <div className="flex items-center gap-2 text-white">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold text-sm">Wallet</span>
              <span className="text-xs text-indigo-300">Tracker</span>
            </div>
          </div>

          <div className="h-8 w-px bg-white/15" />

          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive(item.href)
                    ? 'text-white bg-secondary/60 shadow-lg shadow-indigo-900/50'
                    : 'text-indigo-200 hover:text-white hover:bg-indigo-800/30'
                  }
                `}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-secondary/20 to-secondary/20 pointer-events-none" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
