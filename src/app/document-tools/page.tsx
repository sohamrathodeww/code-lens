import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SlideUp, FadeIn } from '@/components/motion/MotionPrimitives';
import { DocumentToolsFeature } from '@/features/document-tools/DocumentToolsFeature';

export const metadata: Metadata = {
  title: 'Free Online Document Tools Hub - CodeLens',
  description: 'Merge PDFs, extract PDF pages, convert Excel to CSV, and merge Excel spreadsheets instantly and securely in your browser.',
  keywords: [
    'merge pdf',
    'split pdf',
    'excel to csv',
    'merge excel',
    'document tools',
    'free pdf tools',
    'online spreadsheet tools'
  ],
};

export default function DocumentToolsPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#fbfcfd] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500/30">
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl opacity-60" />
      </div>

      <Navbar />

      <main className="relative z-10 w-full mx-auto px-4 sm:px-8 flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto space-y-16">
          <SlideUp delay={0.1}>
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-slate-950 dark:text-white">
                Free Online Document Tools Hub
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                Merge PDFs, convert Excel to CSV, and organize your files securely in seconds.
              </p>
            </div>
          </SlideUp>

          <FadeIn delay={0.2}>
            <DocumentToolsFeature />
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <section className="liquid-glass-surface p-8 rounded-3xl space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed border border-white dark:border-slate-700/80 dark:border-slate-700/80 mt-16">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                  How to Use the Free Document Tools Hub
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  CodeLens provides an instant, privacy-focused document processing suite. Because all processing happens directly in your browser, your sensitive documents are never uploaded to any server.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 space-y-2 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
                  <h3 className="font-bold text-slate-950 dark:text-white text-base">1. Merge PDFs</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Select the <strong>Merge PDFs</strong> tool. Drop up to 5 PDF documents into the input pane. They will be seamlessly stitched together in the order you uploaded them into a single, cohesive PDF file.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 space-y-2 relative overflow-hidden">
                   <div className="absolute -right-4 -top-4 w-16 h-16 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />
                  <h3 className="font-bold text-slate-950 dark:text-white text-base">2. Extract PDF Page</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Select the <strong>Extract PDF Page</strong> tool. Upload a PDF, then enter a specific page number in the Configuration panel. We will instantly extract that specific page into its own lightweight PDF document.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 space-y-2 relative overflow-hidden">
                   <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                  <h3 className="font-bold text-slate-950 dark:text-white text-base">3. Excel to CSV</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Select the <strong>Excel to CSV</strong> tool. Upload your heavy `.xlsx` or `.xls` spreadsheet. We will instantly parse the primary active sheet and convert all data into a lightweight, standard CSV file ready for database imports.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 space-y-2 relative overflow-hidden">
                   <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                  <h3 className="font-bold text-slate-950 dark:text-white text-base">4. Merge Excel Sheets</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Select the <strong>Merge Excel Sheets</strong> tool. Upload up to 5 separate Excel files. We will pull the primary worksheet from each file and compile them all into a single multi-sheet Excel workbook.
                  </p>
                </div>
              </div>
            </section>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}



