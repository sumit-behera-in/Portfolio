import React, { useState } from 'react';

export default function ProjectTabs({ allProjects = [], featuredProjects = [] }) {
  const [activeTab, setActiveTab] = useState('all');
  const activeProjects = activeTab === 'all' ? allProjects : featuredProjects;

  const formatProjectName = (name) => {
    if (!name || typeof name !== 'string') return '';
    return name.replace(/[-_]/g, ' ');
  };

  const formatMonth = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container-max">
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All ({allProjects.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('featured')}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === 'featured'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Featured ({featuredProjects.length})
          </button>
        </div>

        {activeProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects.map((project) => (
              <article
                key={project.name}
                className="card block p-6 hover:shadow-xl transition-all group flex flex-col"
              >
                {project.image && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4 rounded-xl overflow-hidden h-48 bg-slate-200 dark:bg-slate-700 block overflow-hidden"
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </a>
                )}

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium">
                    {project.language || 'Unknown'}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 rounded-full text-sm font-medium">
                      ⭐ Featured
                    </span>
                  )}
                  {project.isOwned && (
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-full text-sm font-medium">
                      👤 Owned
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white transition-colors">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block group-hover:text-blue-500 transition-colors"
                  >
                    {formatProjectName(project.name)}
                  </a>
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 flex-grow line-clamp-2">
                  {project.description}
                </p>

                {project.topics && project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.topics.slice(0, 4).map((topic) => (
                      <span key={topic} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {project.createdAt && <div>Created {new Date(project.createdAt).toLocaleString('en-US', { month: 'short', year: 'numeric' })}</div>}
                  {project.updatedAt && <div>Completed {new Date(project.updatedAt).toLocaleString('en-US', { month: 'short', year: 'numeric' })}</div>}
                  {project.latestRelease && project.latestRelease.url && (
                    <a
                      href={project.latestRelease.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-300 hover:underline"
                    >
                      Latest release {project.latestRelease.tagName || project.latestRelease.name || 'Release'}
                    </a>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700 mt-auto text-slate-600 dark:text-slate-400">
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span>★</span>
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>⑂</span>
                      <span>{project.forks || 0}</span>
                    </div>
                  </div>

                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Updated {project.updatedAt ? new Date(project.updatedAt).toLocaleString('en-US', { month: 'short', year: 'numeric' }) : '—'}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-slate-600 dark:text-slate-400">No projects found for this tab.</p>
          </div>
        )}
      </div>
    </section>
  );
}
