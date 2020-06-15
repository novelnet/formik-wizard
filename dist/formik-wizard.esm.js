import { Formik, Form } from 'formik';
import produce from 'immer';
import React from 'react';
import { Wizard, Steps, Step } from 'react-albus';
import { useLocation } from '@reach/router';
import qs from 'qs';

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

function getInitialValues(steps, query) {
  // ?livingSpace=3&landArea=6
  var parsedURI = qs.parse(query, {
    ignoreQueryPrefix: true
  });
  return steps.reduce(function (curr, next) {
    Object.keys(parsedURI).forEach(function (key) {
      if (next.initialValues && key in next.initialValues) {
        next.initialValues[key] = parsedURI[key];
      }
    });
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
      Form$1 = _ref$Form === void 0 ? Form : _ref$Form,
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
      currentStep: {
        id: step.id,
        progress: step.progress,
        isSubmitStep: step.isSubmitStep
      },
      isLastStep: step.isSubmitStep || steps[steps.length - 1] === step.id
    };
  }, [steps, step]);
  var handleSubmit = React.useCallback(function (sectionValues) {
    try {
      var _temp6 = function _temp6() {
        setStatus(_status);
      };

      setStatus(undefined);

      var _status, goTo;

      var _temp7 = _catch(function () {
        function _temp3() {
          function _temp(_step$onAction) {
            _status = _step$onAction;

            if (Array.isArray(_status)) {

              var _status2 = _status;
              _status = _status2[0];
              goTo = _status2[1];
            }

            setValues(newValues);

            if (goTo) {
              setImmediate(wizard.push, goTo);
            } else {
              setImmediate(wizard.next);
            }
          }

          var _step$onAction2 = step.onAction;
          return _step$onAction2 ? Promise.resolve(step.onAction(sectionValues, values, wizard)).then(_temp) : _temp(undefined); // if (info.isLastStep) {
          //   const newValues = produce(values, (draft: any) => {
          //     draft[info.currentStep.id] = sectionValues
          //   })
          //
          //   status = await onSubmit(newValues)
          //   setValues(newValues)
          // } else {
          //   status = step.onAction
          //     ? await step.onAction(sectionValues, values, wizard)
          //     : undefined
          //
          //   if (Array.isArray(status)) {
          //     ;[status, goTo] = status
          //   }
          //
          //   setValues((values: any) => {
          //     return produce(values, (draft: any) => {
          //       draft[info.currentStep.id] = sectionValues
          //     })
          //   })
          //
          //   if (goTo) {
          //     setImmediate(wizard.push, goTo)
          //   } else {
          //     setImmediate(wizard.next)
          //   }
          // }
        }

        var newValues = produce(values, function (draft) {
          draft[info.currentStep.id] = sectionValues;
        });

        var _temp2 = function () {
          if (info.isLastStep) {
            return Promise.resolve(onSubmit(newValues, step)).then(function () {});
          }
        }();

        return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
      }, function (e) {
        _status = e;
      });

      return Promise.resolve(_temp7 && _temp7.then ? _temp7.then(_temp6) : _temp6(_temp7));
    } catch (e) {
      return Promise.reject(e);
    }
  }, [info.currentStep, info.isLastStep, onSubmit, setStatus, setValues, step, values, wizard.next]);
  return React.createElement(Formik, Object.assign({}, formikProps, {
    enableReinitialize: true,
    initialValues: step.initialValues,
    validationSchema: step.validationSchema,
    validate: step.validate,
    onSubmit: handleSubmit
  }), function (props) {
    return React.createElement(Form$1, {
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

  var _useLocation = useLocation(),
      query = _useLocation.search;

  var _React$useState = React.useState(undefined),
      status = _React$useState[0],
      setStatus = _React$useState[1];

  var _React$useState2 = React.useState(function () {
    return getInitialValues(steps, query);
  }),
      values = _React$useState2[0],
      setValues = _React$useState2[1];

  React.useEffect(function () {
    setValues(getInitialValues(steps, query));
    setStatus(undefined);
  }, [steps]);
  var stepIds = React.useMemo(function () {
    return steps.map(function (step) {
      return step.id;
    });
  }, [steps]);
  return React.createElement(Wizard, Object.assign({}, albusProps), React.createElement(FormikWizardContext.Provider, {
    value: {
      status: status,
      setStatus: setStatus,
      values: values,
      setValues: setValues
    }
  }, React.createElement(Steps, null, steps.map(function (step) {
    return React.createElement(Step, {
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

export default FormikWizard;
export { FormikWizard, useFormikWizard };
//# sourceMappingURL=formik-wizard.esm.js.map
