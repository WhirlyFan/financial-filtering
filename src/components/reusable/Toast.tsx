import { ToastProps } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export interface ToastInterface extends ToastProps {
  buttonText: string;
  description: string;
}

export function Toast({ buttonText, description }: ToastInterface) {
  const { toast } = useToast();
  return (
    <div
      onClick={() => {
        toast({
          description: description,
        });
      }}
    >
      {buttonText}
    </div>
  );
}
