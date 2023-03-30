import Link from "next/link";
export default function Footer() {
  return (
    <footer className="mt-24 py-12 bg-stone-50 border-t-2 border-amber-300 border-dashed text-stone-700">
      <div className="container mx-auto">
        <div className="grid grid-cols-8 gap-12 grid-flow-dense text-base text-slate-600">
          <div className="col-span-6">
            Photos belong to their respective authors. Use, distribution and
            reproduction is subject to relevant licensing terms.
          </div>
          <div className="col-span-2">
            Photo App is open source software by <a
              href="https://aidhan.au"
              className="p-px underline text-emerald-700 decoration-emerald-400 decoration-2 decoration-dashed underline-offset-4 hover:bg-emerald-100 hover:decoration-solid">
              Aidhan Creative
            </a>
            . Licensed under MIT.
          </div>
        </div>
      </div>
    </footer>
  );
}
