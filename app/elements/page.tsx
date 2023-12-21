import Link from "next/link";

export default function Page() {
    return (
        <section className="py-10 container mx-auto">
            <div className="elements-list">
                <Link href="/elements/padding">
                    <div className="">
                        Padding Adder
                    </div>
                </Link>
            </div>
        </section>
    )
}