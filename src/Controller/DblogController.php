<?php

namespace Drupal\react_admin\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Controller for the react dblog.
 */
class DblogController extends ControllerBase {

  /**
   * Renders the react dblog.
   *
   * @return array
   *   The render array.
   */
  public function overview() {
    $build = [];
    $build['#attached']['library'][] = 'react_admin/dblog';
    $build['#markup'] = '<div id="root" />';

    return $build;
  }

}
