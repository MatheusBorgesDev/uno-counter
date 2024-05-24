import logo from "/uno-logo.svg";

export function Header() {
  return (
    <header className="w-full flex items-center justify-center gap-2 border-b border-white p-3">
      <img src={logo} alt="Logo original do UNO" width={100} />
      <h1 className="text-xl text-gray-300 uppercase font-medium">
        Contador de pontos
      </h1>
    </header>
  );
}
