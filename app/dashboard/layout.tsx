
export default function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <div className="bg-white">this is layout of dashboard</div>
        {children}
    </div>
  );
}