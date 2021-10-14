<?php
session_start();
if (isset($_SESSION['answers'])) {
    foreach ($_SESSION['answers'] as $result) { ?>
        <tr>
            <td><p><?php echo $result[0] ?></p></td>
            <td><p><?php echo $result[1] ?></p></td>
            <td><p><?php echo $result[2] ?></p></td>
            <td><p><?php echo $result[3] ?></p></td>
            <td><p><?php echo $result[5] ?></p></td>
            <td><p><?php echo $result[4] ?></p></td>
        </tr>
    <?php }} ?>