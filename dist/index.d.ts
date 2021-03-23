import { FormikWizardContextValue, FormikWizardProps } from './types';
export declare function FormikWizard<T>({ formikProps, albusProps, onSubmit, steps, Form, render, }: FormikWizardProps<T>): JSX.Element;
export default FormikWizard;
export declare function useFormikWizard<T>(): FormikWizardContextValue<T, any>;
