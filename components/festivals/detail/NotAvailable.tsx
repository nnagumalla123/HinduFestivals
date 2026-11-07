/** The honest placeholder for content that has not been researched and reviewed yet. */
export function NotAvailable({ purpose }: { purpose?: string }) {
  return (
    <p className="text-ink-muted">
      <span className="font-semibold text-gold-deep">Not yet available.</span>
      {purpose && <> Planned: {purpose}</>}
    </p>
  );
}
