function LoaderBlock({ text = 'Загрузка...' }) {
  return (
    <div className="loader-block">
      <div className="loader-dot" />
      <span>{text}</span>
    </div>
  );
}

export { LoaderBlock };
