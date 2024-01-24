"use client";

import Header from '@/components/Header';
import PageBuilder from '@/components/PageBuilder';
import Tools from '@/components/Tools';
import OxenEvents from '@/components/PageBuilder/Events';

export default function Home() {
  return (
    <>
    <OxenEvents />

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
