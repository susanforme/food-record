"use strict";
exports.__esModule = true;
var router_1 = require("@/router");
var NavBar_module_less_1 = require("./NavBar.module.less");
var Icon_1 = require("./Icon");
var react_redux_1 = require("react-redux");
var store_1 = require("@/store");
var utils_1 = require("@/utils");
function NavBar(_a) {
    var pathname = _a.pathname;
    var Links = router_1["default"]
        .filter(function (v) { var _a; return (_a = v.args) === null || _a === void 0 ? void 0 : _a.isMenu; })
        .map(function (v) {
        var _a;
        var path = ((_a = v.path) === null || _a === void 0 ? void 0 : _a.toString()) || '';
        var activeClass = utils_1.getIsChildRoute(path, pathname) ? NavBar_module_less_1["default"].active : undefined;
        if (path === '/publish') {
            return React.createElement("div", { key: path }, "publish");
        }
        return (React.createElement("div", { key: path, className: NavBar_module_less_1["default"].iconFather, onClick: function () { return store_1.history.push(path); } },
            React.createElement(Icon_1["default"], { type: "icon-home", className: activeClass }),
            React.createElement("a", { href: path, className: activeClass, onClick: function (e) { return e.preventDefault(); } }, v.title)));
    });
    return (React.createElement("div", { className: NavBar_module_less_1["default"].navBar, id: "nav" }, Links));
}
var mapStateToProps = function (state) { return ({
    pathname: state.router.location.pathname
}); };
exports["default"] = react_redux_1.connect(mapStateToProps)(NavBar);
