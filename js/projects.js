// Renders project cards from PROJECTS data
// Used on index.html (preview strip) and pages/projects.html (full grid)

function buildProjectCard(project, linkToPage = true) {
  const tags = project.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
  const href     = linkToPage ? `pages/project-detail.html?id=${project.id}` : `project-detail.html?id=${project.id}`;
  const blogHref = linkToPage ? `pages/blog-post.html?slug=${project.blogSlug}` : `blog-post.html?slug=${project.blogSlug}`;

  return `
    <article class="panel project-card reveal" onclick="window.location='${href}'">
      <div class="card-header ${project.color}">
        <div class="card-issue">Issue ${project.issue}</div>
        <div class="card-title">${project.title}</div>
        <div class="card-subtitle">${project.subtitle}</div>
      </div>
      <div class="card-body">
        <p>${project.description}</p>
        <div>${tags}</div>
      </div>
      <div class="card-footer">
        <a class="pow pow-red" href="${blogHref}" onclick="event.stopPropagation()">Dev Diary</a>
        <a class="pow pow-yellow" href="${project.github}" target="_blank" onclick="event.stopPropagation()">GitHub</a>
        ${project.demo ? `<a class="pow pow-blue" href="${project.demo}" target="_blank" onclick="event.stopPropagation()">Demo</a>` : ''}
      </div>
    </article>`;
}

// Homepage preview — first 3 projects
const homeGrid = document.getElementById('projectGrid');
if (homeGrid && typeof PROJECTS !== 'undefined') {
  homeGrid.innerHTML = PROJECTS.slice(0, 3).map(p => buildProjectCard(p, true)).join('');
  if (typeof initReveal === 'function') initReveal();
}

// Projects page — all projects
const allGrid = document.getElementById('allProjectsGrid');
if (allGrid && typeof PROJECTS !== 'undefined') {
  allGrid.innerHTML = PROJECTS.map(p => buildProjectCard(p, false)).join('');
  if (typeof initReveal === 'function') initReveal();
}