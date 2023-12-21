"use client";

import Header from '@/components/Header';
import PageBuilder from '@/components/PageBuilder';
import Tools from '@/components/Tools';

export default function Home() {
  return (
    <>
    <main>
      <section>
        {/* Header */}
        <Header />

        {/* Website Builder */}
        <PageBuilder />

        {/* Widgets & Tools */}
        <Tools />
      </section>
    </main>
    </>
  )
}
