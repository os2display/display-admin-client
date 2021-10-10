import { React } from "react";
import { useHistory } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Toast from "../util/toast/toast";
import ContentBody from "../util/content-body/content-body";
import ContentFooter from "../util/content-footer/content-footer";
import FormInput from "../util/forms/form-input";

/**
 * The slide form component.
 *
 * @param {object} props - The props.
 * @param {object} props.group The slide object to modify in the form.
 * @param {Function} props.handleInput Handles form input.
 * @param {Function} props.handleSubmit Handles form submit.
 * @param {boolean} props.isSaving Is the form saving?
 * @param {string} props.headerText Headline text.
 * @param {boolean|null} props.isSaveSuccess Is the save a success?
 * @param {boolean|null} props.isLoading The data is loading.
 * @param {Array} props.errors Array of errors.
 * @returns {object} The slide form.
 */
function GroupForm({
  group,
  handleInput,
  handleSubmit,
  isSaving,
  headerText,
  isSaveSuccess,
  isLoading,
  errors,
}) {
  const { t } = useTranslation("common");
  const history = useHistory();
  const [selectedGroups, setSelectedGroups] = useState([]);
  const {
    data,
    error: loadSelectedGroupsError,
    isLoading: isLoadingSelectedGroups,
  } = useGetV1PlaylistsByIdSlidesQuery({ id: idFromUrl(playlist.slides) });

  /**
   * Map loaded data.
   */
  useEffect(() => {
    if (data && !Array.isArray(playlist.slides)) {
      let originallySelectedSlides = data["hydra:member"].map(({ slide }) => {
        return slide;
      });
      setSelectedSlides(originallySelectedSlides);
    }
  }, [data]);

  return (
    <Form>
      <h1>{headerText}</h1>
      {isLoading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("group-form.loading")}
        </>
      )}
      {isSaving && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="m-1"
          />
          {t("group-form.saving")}
        </>
      )}
      {!isLoading && (
        <>
          <ContentBody>
            <FormInput
              name="title"
              type="text"
              label={t("group-form.group-title-label")}
              placeholder={t("group-form.group-title-placeholder")}
              value={group.title}
              onChange={handleInput}
            />
            <FormInput
              name="description"
              type="text"
              label={t("group-form.group-description-label")}
              placeholder={t("group-form.group-description-placeholder")}
              value={group.description}
              onChange={handleInput}
            />
          </ContentBody>
        </>
      )}
      <ContentFooter>
        <Button
          variant="secondary"
          type="button"
          id="cancel_slide"
          onClick={() => history.push("/group/list/")}
          className="me-md-3 col"
          size="lg"
        >
          {t("group-form.cancel-button")}
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={handleSubmit}
          id="save_slide"
          size="lg"
          className="col"
        >
          {t("group-form.save-button")}
        </Button>
        <Toast show={isSaveSuccess} text={t("group-form.saved")} />
        <Toast show={!!errors} text={t("group-form.error")} />
      </ContentFooter>
    </Form>
  );
}

GroupForm.propTypes = {
  group: PropTypes.objectOf(PropTypes.any).isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  headerText: PropTypes.string.isRequired,
  isSaveSuccess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.bool,
  ]).isRequired,
};

export default GroupForm;
