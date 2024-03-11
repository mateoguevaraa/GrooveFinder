export function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="">
          GrooveFinder
        </a>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://github.com/mateoguevaraa/GrooveFinder"
              target="blank"
            >
              <button className="btn btn-sm github-btn">
                {" "}
                <i className="fa-regular fa-star"></i>Star
              </button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
