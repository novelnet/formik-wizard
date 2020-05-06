'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var formik = require('formik');
var produce = _interopDefault(require('immer'));
var React = _interopDefault(require('react'));
var reactAlbus = require('react-albus');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

function getInitialValues(steps) {
  return steps.reduce(function (curr, next) {
    curr[next.id] = next.initialValues;
    return curr;
  }, {});
}

var FormikWizardContext =
/*#__PURE__*/
React.createContext(null);

function FormikWizardStep(_ref) {
  var step = _ref.step,
      _ref$Form = _ref.Form,
      Form = _ref$Form === void 0 ? formik.Form : _ref$Form,
      FormWrapper = _ref.FormWrapper,
      steps = _ref.steps,
      wizard = _ref.wizard,
      formikProps = _ref.formikProps,
      onSubmit = _ref.onSubmit,
      setStatus = _ref.setStatus,
      status = _ref.status,
      values = _ref.values,
      setValues = _ref.setValues;
  var info = React.useMemo(function () {
    return {
      canGoBack: steps[0] !== step.id,
      currentStep: step.id,
      isLastStep: steps[steps.length - 1] === step.id
    };
  }, [steps, step]);
  var handleSubmit = React.useCallback(function (sectionValues) {
    try {
      var _temp5 = function _temp5() {
        setStatus(_status);
      };

      setStatus(undefined);

      var _status, goTo;

      var _temp6 = _catch(function () {
        var _temp2 = function () {
          if (info.isLastStep) {
            var newValues = produce(values, function (draft) {
              draft[info.currentStep] = sectionValues;
            });
            return Promise.resolve(onSubmit(newValues)).then(function (_onSubmit) {
              _status = _onSubmit;
              setValues(newValues);
            });
          } else {
            var _temp7 = function _temp7(_step$onAction) {
              _status = _step$onAction;

              if (Array.isArray(_status)) {
                var _status2 = _status;
                _status = _status2[0];
                goTo = _status2[1];
              }

              setValues(function (values) {
                return produce(values, function (draft) {
                  draft[info.currentStep] = sectionValues;
                });
              });

              if (goTo) {
                setImmediate(wizard.push, goTo);
              } else {
                setImmediate(wizard.next);
              }
            };

            var _step$onAction3 = step.onAction;
            return _step$onAction3 ? Promise.resolve(step.onAction(sectionValues, values, wizard)).then(_temp7) : _temp7(undefined);
          }
        }();

        if (_temp2 && _temp2.then) return _temp2.then(function () {});
      }, function (e) {
        _status = e;
      });

      return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(_temp5) : _temp5(_temp6));
    } catch (e) {
      return Promise.reject(e);
    }
  }, [info.currentStep, info.isLastStep, onSubmit, setStatus, setValues, step, values, wizard.next]);
  return React.createElement(formik.Formik, Object.assign({}, formikProps, {
    enableReinitialize: true,
    initialValues: step.initialValues,
    validationSchema: step.validationSchema,
    validate: step.validate,
    onSubmit: handleSubmit
  }), function (props) {
    return React.createElement(Form, {
      onSubmit: props.handleSubmit
    }, React.createElement(FormWrapper, Object.assign({}, info, {
      steps: steps,
      wizard: wizard,
      actionLabel: step.actionLabel,
      isSubmitting: props.isSubmitting,
      goToPreviousStep: function goToPreviousStep() {
        setStatus(undefined);

        if (step.keepValuesOnPrevious) {
          setValues(function (values) {
            return produce(values, function (draft) {
              draft[step.id] = props.values;
            });
          });
        }

        wizard.previous();
      },
      status: status,
      values: values,
      setStatus: setStatus,
      setValues: setValues
    }), React.createElement(step.component)));
  });
}

function FormikWizard(_ref2) {
  var formikProps = _ref2.formikProps,
      albusProps = _ref2.albusProps,
      onSubmit = _ref2.onSubmit,
      steps = _ref2.steps,
      Form = _ref2.Form,
      _render = _ref2.render;

  var _React$useState = React.useState(undefined),
      status = _React$useState[0],
      setStatus = _React$useState[1];

  var _React$useState2 = React.useState(function () {
    return getInitialValues(steps);
  }),
      values = _React$useState2[0],
      setValues = _React$useState2[1];

  React.useEffect(function () {
    setValues(getInitialValues(steps));
    setStatus(undefined);
  }, [steps]);
  var stepIds = React.useMemo(function () {
    return steps.map(function (step) {
      return step.id;
    });
  }, [steps]);
  return React.createElement(reactAlbus.Wizard, Object.assign({}, albusProps), React.createElement(FormikWizardContext.Provider, {
    value: {
      status: status,
      setStatus: setStatus,
      values: values,
      setValues: setValues
    }
  }, React.createElement(reactAlbus.Steps, null, steps.map(function (step) {
    return React.createElement(reactAlbus.Step, {
      key: step.id,
      id: step.id,
      render: function render(wizard) {
        return React.createElement(FormikWizardStep, {
          wizard: wizard,
          formikProps: formikProps,
          onSubmit: onSubmit,
          steps: stepIds,
          status: status,
          values: values,
          setValues: setValues,
          setStatus: setStatus,
          step: _extends({}, step, {
            initialValues: values[step.id] || {}
          }),
          Form: Form,
          FormWrapper: _render
        });
      }
    });
  }))));
}
function useFormikWizard() {
  return React.useContext(FormikWizardContext);
}

exports.FormikWizard = FormikWizard;
exports.default = FormikWizard;
exports.useFormikWizard = useFormikWizard;
//# sourceMappingURL=formik-wizard.cjs.development.js.map
