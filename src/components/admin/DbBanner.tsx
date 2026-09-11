import { AlertCircle, CheckCircle } from 'lucide-react';

export default function DbBanner({ ok, message }: { ok: boolean; message: string }) {
  if (ok) return null;

  return (
    <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 text-sm text-orange-900">
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Database is offline — new requests are still emailed and texted to you.</p>
        <p className="mt-1 text-orange-800">{message}</p>
        <p className="mt-2">
          Restore the project at{' '}
          <a
            href="https://supabase.com/dashboard/project/ajgmichfufztwwypepax"
            className="underline font-semibold"
            target="_blank"
            rel="noreferrer"
          >
            Supabase → Houston Handy Pros
          </a>
          , then run <code className="bg-white px-1 rounded">supabase/schema.sql</code>.
        </p>
      </div>
    </div>
  );
}

export function LivePill({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
        ok ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
      }`}
    >
      {ok ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
      {ok ? 'Live data' : 'Demo offline'}
    </span>
  );
}
