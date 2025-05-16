interface ThankYouMessageProps {
  onClose: () => void
}

export function ThankYouMessage({}: ThankYouMessageProps) {
  return (
    <div className="text-center py-6">
      <h2 className="text-2xl font-medium mb-2">Thank you!</h2>
      <p className="text-gray-600 max-w-md mx-auto">
        Your application has been submitted. We have received your request, and
        we will revert within 7 seven working days.
      </p>
    </div>
  )
}
