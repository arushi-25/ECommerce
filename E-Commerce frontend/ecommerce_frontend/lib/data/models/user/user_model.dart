class UserModel {
  String? sId;
  String? fullName;
  String? email;
  String? password;
  String? address;
  String? city;
  String? state;
  int? profileProgress;
  String? id;
  String? updatedOn;
  String? createdOn;
  int? iV;

  UserModel(
      {this.sId,
      this.fullName,
      this.email,
      this.password,
      this.address,
      this.city,
      this.state,
      this.profileProgress,
      this.id,
      this.updatedOn,
      this.createdOn,
      this.iV});

  UserModel.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    fullName = json['fullName'];
    email = json['email'];
    password = json['password'];
    address = json['address'];
    city = json['city'];
    state = json['state'];
    profileProgress = json['profileProgress'];
    id = json['id'];
    updatedOn = json['updatedOn'];
    createdOn = json['createdOn'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['fullName'] = this.fullName;
    data['email'] = this.email;
    data['password'] = this.password;
    data['address'] = this.address;
    data['city'] = this.city;
    data['state'] = this.state;
    data['profileProgress'] = this.profileProgress;
    data['id'] = this.id;
    data['updatedOn'] = this.updatedOn;
    data['createdOn'] = this.createdOn;
    data['__v'] = this.iV;
    return data;
  }
}
