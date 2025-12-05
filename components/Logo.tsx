// Use a remote or public image instead of "figma:asset"
const logoImage = "https://yourcdn.com/dawa-logo.png";

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img
      src={logoImage}
      alt="Dawa Health Logo"
      className={className}
      style={{ objectFit: "contain" }}
      draggable={false}
    />
  );
}

export function LogoWithText({
  className = "text-2xl",
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <div className={`${className} flex items-center gap-3`}>
      <Logo className="w-10 h-10" />

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className="text-white font-extrabold tracking-tight">DAWA</span>
          <span className="text-white/90 font-semibold tracking-tight">HEALTH</span>
        </div>

        {showTagline && (
          <p className="text-xs text-white/70 leading-tight font-medium">
            Africa's #1 network
          </p>
        )}
      </div>
    </div>
  );
}
