

var X_min = 0;
var X_max = 0;
var min_ = 0;
var max_ = 1;

var data = { X_max: X_max, X_min: X_min, max_: max_, min_: min_ };

function fit(X, min = 0, max = 1) {
  X_max = Math.max.apply(null, X);
  X_min = Math.min.apply(null, X);
  min_ = min;
  max_ = max;

  var X_minArr = X.map(function (values) {
    return values - X_min;
  });
  // X_std = (X - X.min()) / (X.max() - X.min())
  var X_std = X_minArr.map(function (values) {
    return values / (X_max - X_min);
  });
  // X_scaled = X_std * (max - min) + min
  var X_scaled = X_std.map(function (values) {
    return values * (max - min) + min;
  });

  return X_scaled;
}

function fit_transform(data, min = 0, max = 1) {
  var train_scaled = fit(data, min, max);


  return train_scaled;
}

function inverse_transform(input, min = 0, max = 1) {
  var fit = data;

  var X = input.map(function (values) {
    return (values - min) / (max - min);
  });
  var X_ = X.map(function (values) {
    return values * (fit.X_max - fit.X_min) + fit.X_min;
  });

  return X_;
}

export default { fit_transform, inverse_transform };