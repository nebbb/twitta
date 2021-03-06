from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Notification
from datetime import datetime as dt


notification_routes = Blueprint("notifications", __name__)


# Get Notificatons For User
@notification_routes.route('/all/<int:user_id>', methods =['GET'])
@login_required
def get_the_notifications(user_id):
    notifications = db.session.query(Notification).filter(Notification.reciever == user_id).all()
    notification_loop = []

    for notification in notifications:
        notification_dict = notification.to_dict()

        user = User.query.get(notification_dict["sender"])

        notification_dict["user"] = user.to_dict()

        notification_loop.append(notification_dict)


    return {"notifications": notification_loop}



# Remove a notification
@notification_routes.route('/remove/<int:id>', methods =['DELETE'])
@login_required
def remove_the_notification(id):
    db.session.query(Notification).filter(Notification.id==id).delete()
    db.session.commit()


    return {"notification_id": id}
