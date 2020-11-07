import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask("Peon API")
CORS(app)

jira_base = 'https://jira.tarent.de/rest/api/2/'
jira_all_issues_for_current_user = jira_base + "search?jql=assignee%20=%20currentuser()&fields=project,summary,status&maxResults=1000"

@app.route("/jira", methods=["POST"])
def get_jira_data():
    user_name = request.form.get('username')
    password = request.form.get('password')


    r = requests.get(jira_all_issues_for_current_user,
                     auth=(user_name, password))
    projects = {}
    for issue in r.json()['issues']:
        issue_key = issue['key']
        project_key = issue['fields']['project']['key']
        project_name = issue['fields']['project']['name']
        issue_summary = issue['fields']['summary']
        issue_status = issue['fields']['status']['name']
        if project_key not in projects:
            projects[project_key] = {
                'name': project_name,
                'issues': []
            }
        projects[project_key]['issues'].append({'key': issue_key, 'summary': issue_summary, 'status': issue_status})

    return jsonify(projects), 200


# issues[x][fields[project[key + name] + summary] + key]

# @app.route("/movies", methods=["POST"])
# def movies_post():
#     payload = request.get_json(silent=True)
#     if not payload or "nume" not in payload:
#         return "Bad request", 400
#
#     add_movie(payload["nume"])
#     return "Created", 201
#
#
# @app.route("/movie/<int:movie_id>", methods=["PUT"])
# def movie_put(movie_id):
#     payload = request.get_json(silent=True)
#     if not payload or "nume" not in payload:
#         return "Bad request", 400
#
#     if movie_id not in movies:
#         return "Not found", 404
#
#     update_movie(movie_id, payload["nume"])
#     return "Updated", 200
#
#
# @app.route("/movie/<int:movie_id>", methods=["GET"])
# def movie_get(movie_id):
#     if movie_id not in movies:
#         return "Not found", 404
#
#     return jsonify(movies[movie_id]), 200
#
#
# @app.route("/movie/<int:movie_id>", methods=["DELETE"])
# def movie_delete(movie_id):
#     if movie_id not in movies:
#         return "Not found", 404
#
#     delete_movie(movie_id)
#     return "Deleted", 200
#
#
# @app.route("/reset", methods=["DELETE"])
# def reset_call():
#     reset()
#     return "Data reset", 200


if __name__ == '__main__':
    app.run('localhost', debug=True)
