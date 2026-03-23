import Header from './Header.jsx';

export default function PageLayout({ title, children }) {
  return (
    <div className="page">
      <Header />
      <main className="page-main">
        <h1 className="page-title">{title}</h1>
        {children}
      </main>
    </div>
  );
}
