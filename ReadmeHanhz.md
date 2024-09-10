\*NavBAr comment

<!-- instead of repeating code, we use map method to loop through each links -->

          ##<!-- Before -->

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
