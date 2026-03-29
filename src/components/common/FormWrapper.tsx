import Form from "@/components/form/Form";
import ComponentCard from "@/components/common/ComponentCard";
import React from "react";

interface FormWrapperProps {
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export default function FormWrapper({ title, onSubmit, children, className }: FormWrapperProps) {
  return (
    <ComponentCard title={title} className={className}>
      <Form onSubmit={onSubmit} className="space-y-4">
        {children}
      </Form>
    </ComponentCard>
  );
}

