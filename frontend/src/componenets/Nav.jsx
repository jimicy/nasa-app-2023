import { Link } from "react-router-dom";

export function MainNav({ ...props }) {
  return (
    <div
      data-theme="dark"
      className="navbar bg-base-100"
      style={{ position: "fixed", top: 0, zIndex: 100 }}
    >
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          NASA Exoplanet Adventure
        </Link>
      </div>
      <div className="navbar-end">
        <div className="flex space-x-4 justify-center">
          <Link to="/gallery" className="btn btn-outline">
            Gallery
          </Link>
          <Link to="/create" className="btn btn-outline">
            Create
          </Link>
        </div>
      </div>
    </div>
  );
}
