// pages/genres/index.tsx

import Link from 'next/link';

const GenresPage: React.FC = () => {
  return (
    <div>
      <h1>Select a Genre</h1>
      <div className="flex flex-wrap justify-center">
        <Link href="/genres/classical">
          <a className="genre-card">
            <p>Classical</p>
          </a>
        </Link>
        <Link href="/genres/romantic">
          <a className="genre-card">
            <p>Romantic</p>
          </a>
        </Link>
        {/* Add links for other genres (hip-hop, jazz, pop, rock) similarly */}
      </div>
    </div>
  );
};

export default GenresPage;
