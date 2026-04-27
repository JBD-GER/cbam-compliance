type ProcessStepProps = {
  number: number;
  title: string;
  text: string;
};

export function ProcessStep({ number, title, text }: ProcessStepProps) {
  return (
    <div className="glass p-6">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </div>
  );
}
