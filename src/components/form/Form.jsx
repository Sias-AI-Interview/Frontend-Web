import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export default function Form({ schema, onSubmit, children, defaultValues = {} }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  const clonedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.props.name) {
      return React.cloneElement(child, {
        register,
        error: errors[child.props.name]
      });
    }
    return child;
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {clonedChildren}
      <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>Submit</button>
    </form>
  );
}
