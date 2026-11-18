function Layout({ children }) {
  return (
    <>
      <main>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-2 gap-4"> {children}</div>
        </div>
      </main>
    </>
  );
}

export default Layout;
