import { Nav, NavLink } from "@/components/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import ToggleTheme from "./_components/toggle-theme";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <Nav>
          <NavLink href="/admin">Dashboard</NavLink>
          <NavLink href="/admin/orders">Orders</NavLink>
          <NavLink href="/admin/products">Products</NavLink>
          <NavLink href="/admin/clients">Clients</NavLink>
        </Nav>
        <div className="container my-6">
          {children}
          <ToggleTheme />
          </div>
      </ThemeProvider>
    </>
  );
}
