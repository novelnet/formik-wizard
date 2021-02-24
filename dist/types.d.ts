import { FormikProps, FormikErrors } from 'formik';
import { WizardContext, WizardProps } from 'react-albus';
import { Schema } from 'yup';
export declare type FormikWizardBaseValues = any;
export interface FormikWizardContextValue<V = any, S = any> {
    status: S;
    setStatus: React.Dispatch<React.SetStateAction<S>>;
    values: V;
    setValues: React.Dispatch<React.SetStateAction<V>>;
}
export interface FormikWizardStepType {
    id: string;
    component: React.SFC<{}>;
    validationSchema?: Schema<any>;
    validate?: (values: any) => void | object | Promise<FormikErrors<any>>;
    initialValues?: FormikWizardBaseValues;
    progress?: number;
    actionLabel?: string;
    isSubmitStep?: boolean;
    canGoBack?: boolean;
    onAction?: (sectionValues: FormikWizardBaseValues, formValues: FormikWizardBaseValues, wizard: WizardContext) => Promise<any>;
    keepValuesOnPrevious?: boolean;
}
export interface FormikWizardWrapperProps<Values, Status = any> extends FormikWizardContextValue<Values, Status> {
    canGoBack: boolean;
    goToPreviousStep: () => void;
    currentStep: object;
    actionLabel?: string;
    isLastStep: boolean;
    steps: string[];
    wizard: WizardContext;
    children: React.ReactNode;
    isSubmitting: boolean;
}
export interface FormikWizardProps<Values, Status = any> {
    steps: FormikWizardStepType[];
    render: React.SFC<FormikWizardWrapperProps<Values, Status>>;
    onSubmit: (values: Values, step: object) => void | Promise<void>;
    formikProps?: Partial<FormikProps<Values>>;
    albusProps?: Partial<WizardProps>;
    Form?: any;
}
