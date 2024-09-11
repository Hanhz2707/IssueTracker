<!-- Navbar file -->

<!-- instead of repeating code, we use map method to loop through each links -->

<!-- Before -->

          {/* <li>
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
              href="/"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
              href="/issues"
            >
              Issues
            </Link>
          </li> */}

<!-- After -->

                    {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}

<!-- ---------------------------------------------------------------------- -->

                        // className={`${
              //   link.href === currentPath
              //     ? "text-zinc-900 font-bold  "
              //     : "text-zinc-500"
              // } hover:text-zinc-800 transition-colors`}

<!-- Importing classnames packages to ease the complexity of the code incase the classname in the future will be too long -->

                            className={classNames({
                "text-zinc-900 font-bold": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800": true,
                "transition-colors": true,
              })}
