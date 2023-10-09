export function MainNav({ ...props }) {
  return (
    <div
      data-theme="dark"
      className="navbar bg-base-100"
      style={{ position: "fixed", top: 0 }}
    >
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          NASA Exoplanet Adventure
        </a>
      </div>
      <div className="navbar-end">
        <div className="flex space-x-4 justify-center">
          <a href="/gallery" className="btn btn-outline">
            Gallery
          </a>
          <a href="/create" className="btn btn-outline">
            Create
          </a>
        </div>
      </div>
    </div>
  );
}
