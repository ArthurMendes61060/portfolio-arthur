import json
import os
from flask import Flask, render_template, abort, request

app = Flask(__name__)


def load_projects():
    path = os.path.join(os.path.dirname(__file__), 'data', 'projects.json')
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


@app.route('/')
def index():
    projects = load_projects()
    featured = [p for p in projects if p.get('featured')]
    recent = [p for p in projects if not p.get('featured')][:6]
    return render_template('index.html', featured=featured, recent=recent, all_projects=projects)


@app.route('/projetos')
def projects():
    all_projects = load_projects()
    category = request.args.get('categoria', '')
    categories = sorted({cat for p in all_projects for cat in p.get('categories', [])})
    if category:
        filtered = [p for p in all_projects if category in p.get('categories', [])]
    else:
        filtered = all_projects
    return render_template('projects.html', projects=filtered, categories=categories, active_category=category)


@app.route('/projetos/<slug>')
def project_detail(slug):
    all_projects = load_projects()
    project = next((p for p in all_projects if p['slug'] == slug), None)
    if not project:
        abort(404)
    idx = all_projects.index(project)
    next_project = all_projects[(idx + 1) % len(all_projects)] if len(all_projects) > 1 else None
    prev_project = all_projects[(idx - 1) % len(all_projects)] if len(all_projects) > 1 else None
    return render_template('project_detail.html', project=project, next_project=next_project, prev_project=prev_project)


@app.route('/sobre')
def about():
    return render_template('about.html')


@app.route('/contato')
def contact():
    return render_template('contact.html')


@app.errorhandler(404)
def not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def server_error(e):
    return render_template('404.html'), 500


if __name__ == '__main__':
    app.run(debug=True)
